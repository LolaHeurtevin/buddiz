# Buddiz ( app en développement )

## 1. Présentation du projet
Buddiz est une PWA conteneurisée destinée à aider les gens à se rencontrer et à passer du temps ensemble autour d'activités. Les principales fonctionnalités de ce projet sont :
- la carte interactive, référençant les activités
- une liste d'activités sous forme de cartes
- une vue unique d'une activité
- un formulaire de création d'activité
- un formulaire de test de personnalité
- une boutique permettant d'effectuer des achats in-app
- une page de gestion de profil
  
Le projet inclut :
- Une application principale (`buddiz-app`)
- Une stack de monitoring
- Une configuration prête pour l’intégration continue
- Un système de logs centralisés

# 2. Lancer le projet en local

## Prérequis

Avant de commencer, assurez-vous d’avoir installé :

- Docker (>= 24.x)
- Docker Compose (plugin v2 recommandé)
- Git

## Étape 1 — cloner le dépôt
```bash
git clone https://github.com/LolaHeurtevin/buddiz.git
cd buddiz
```

## Étape 2 — lancer l’application
```bash
docker compose up -d --build
```

Ou sans utiliser docker
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```
Puis ouvrir [http://localhost:3000](http://localhost:3000)

## Étape 3 — lancer la stack de monitoring
```bash
docker compose -f docker-compose.monitoring.yml up -d
```
Services disponibles :
- Grafana (visualisation) : http://localhost:3001
- Prometheus  (métriques) : http://localhost:9090
- Loki (logs) : http://localhost:3100
- Promtail : (collecte des logs Docker)

Identifiants Grafana par défaut : admin / admin

## Étape 4 — vérifier les logs

Dans Grafana, aller dans Explore puis sélectionner la source Loki et utiliser la requête : {container="buddiz-app"}

# 3. Qualité du code — Lint & Tests

Avant tout build Docker, la pipeline exécute :
- L'installation des dépendances
- Le linting du code (ESLint)
- Les tests unitaires

Si le lint échoue ou si un test ne passe pas, le pipeline est immédiatement bloqué et le merge vers main est impossible. Cette étape permet de garantir que le code intégré respecte les standards du projet et ne casse pas des fonctionnalités existantes. L’objectif est de détecter les problèmes le plus tôt possible, avant la phase de conteneurisation.

# 4. Architecture et choix techniques
L’architecture repose sur une application conteneurisée, accessible depuis le registry docker et sécurisée grâce à une pipeline CI/CD automatisée. L'app dispose d'un monitoring centralisé sur Grafana, qui affiche : la disponibilité du service, la consommation CPU, la consommation de mémoire et les logs applicatifs..

## Schéma du pipeline CI/CD et de l'infrastructure
                 ┌────────────────────┐
                 │    Développeur     │
                 └─────────┬──────────┘
                           │ push
                           ▼
                ┌─────────────────────┐
                │       GitHub        │
                └─────────┬───────────┘
                          │ déclenche
                          ▼
              ┌─────────────────────────┐
              │        CI Pipeline       │
              │--------------------------│
              │ 1. Build Docker image    │
              │ 2. Tests                 │
              │ 3. Scan sécurité (SAST)  │
              │ 4. Scan image (Trivy)    │
              │ 5. Push Registry         │
              └─────────┬───────────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │   Docker Registry   │
              └─────────┬───────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │   Serveur Prod      │
              │---------------------│
              │ Docker Compose      │
              │ Loki / Promtail     │
              │ Grafana             │
              └─────────────────────┘

## Stratégie de branches
Le projet utilise GitHub Flow car c'est plus léger que Gitflow et orienté CI/CD.
La branche main représente l’état stable et déployable de l’application. Toute évolution (fonctionnelle ou technique) est réalisée dans une branche dédiée et intégrée via Pull Request après validation automatique par la CI (tests, scans de sécurité).

## Conteneurisation — Docker

Docker permet d'exécuter l'app dans un environnement identique en local et en production, ce qui permet une simplification du déploiement.

## CI/CD

Le pipeline CI est basé sur :
- Build automatique de l’image
- Scan de sécurité
- Push dans le registry
- Déploiement automatisé

J'ai choisi Github Actions comme outil de CI car il est intégré nativement dans le répository, exécute rapidement le pipelines et est bien supporté par les environnements Docker.

## Analyse de sécurité

Trivy est utilisé pour scanner les images et détecter les vulnérabilités connues, empêcher le déploiement d’images critiques et maintenir un niveau de sécurité minimal sur le projet.
J'ai fait ce choix car il est facile à intégrer, rapide à l'exécution et que la base des vulnérabilités connues est régulièrement mise à jour.

## Monitoring

J'ai choisi Grafana car cet outil propose une interface unifiée pour les logs et les métriques, qu'il est facile à utiliser et compatible nativement avec Prometheus et Loki.
J'ai choisi Loki car il est optimisé pour les logs conteneurisés et léger et comparaison avec Elasticsearch.

# 5. Sécurisation du pipeline

La sécurité est intégrée à chaque étape. Avant le build, le code est scanné à l'aide de CodeQL (SAST), les dépendances à l'aide de npm audit (SCA) afin de prévenir des failles de sécurité liées au code ou aux dépendances et GitLeaks (secret detection) s'assure qu'aucun secret n'est divulgué dans le code avant le merge. Puis pendant le build, les dépendances inutiles sont supprimées, l'image est basée sur une version minimale. Une fois l'app buildée, son image docker est scannée à l'aide de Trivy (container scan).
La pipeline se bloque en cas de vulnérabilité critique.
J'ai choisi CodeQL car c'est intégré directement dans GitHub actions et qu'il n'y a pas d'installation à faire ni clé à installer. De plus CodeQL support NextJS et comprend le backend, frontend, les API et le build. De même, j'ai choisi GitLeaks en raison de son intégration native.

Les variables sensibles stockées dans GitHub Secrets et aucun secret en clair dans le repository.

# 6. Exposition en production — HTTPS

Le déploiement sur le VPS ne rend pas directement l’application accessible publiquement, l’exposition se fait via Nginx Proxy Manager, déjà présent sur le serveur.

Pour cela, Docker Compose lance l’application sur un port interne (3000), et Nginx Proxy Manager redirige un nom de domaine vers ce port. Un certificat SSL Let’s Encrypt est généré automatiquement depuis l’interface, ainsi l’application est accessible en HTTPS sécurisé. Cette configuration permet d’isoler les conteneurs, de ne pas exposer directement les ports internes et d’avoir un certificat valide sans configuration manuelle complexe.

# 7. Structure des services

buddiz/
│
├── docker-compose.yml
├── docker-compose.monitoring.yml
├── loki-config.yaml
├── promtail-config.yaml
└── ...

# 8. Procédure de rollback

En cas d’échec du déploiement en production, deux options sont possibles.

## Cas 1 — déploiement par tag d’image

Lister les images disponibles :

docker images

Relancer la version précédente :
```bash
docker compose down
docker compose pull buddiz-app:<ancien-tag>
docker compose up -d
```
## Cas 2 — rollback via Git

Revenir au commit stable :

```bash
git checkout <commit-stable>
docker compose up -d --build
```
## Cas 3 — si la mise à jour casse la stack

Redémarrage complet propre :
```bash
docker compose down -v
docker compose up -d
```
# 9. Bonnes pratiques à mettre en place sur le projet

Créer des branches dédiées aux fonctionnalités développées, tester localement avant push, vérifier les logs dans Grafana, surveiller les erreurs dans Prometheus.

# 10. Dépannage rapide
L’application ne démarre pas
```bash
docker logs buddiz-app
```
Les logs n’apparaissent pas
```bash
docker logs promtail
docker logs loki
```
Problème réseau entre services
```bash
docker network ls
docker network inspect <network>
```

# 11. Conclusion et problèmes rencontrés

La démarche DevSecOps m'a permise de :
- sécurité mon app dès le développement
- automatiser les contrôles
- mettre en place une détection précoce des vulnérabilités

Lors de mes choix d'outils, je me suis tournée en priorité vers des outils natifs ou facilement intégrables à mon projet, afin d'éviter au maximum les conflits et facilter leur intégration. j'ai également fait attention à la légereté des outils utilisés et à leur maintenabilté.

J'ai rencontré plusieurs problèmes tout au long de la mise en place de l'industrialisation de mon projet, j'ai passé beaucoup de temps à débugger mon projet et les erreurs survenues dans la pipeline CI lors de mes tentatives de PR sur GitHub, j'ai également passé beaucoup de temps à configuer le serveur VPS car mon projet ne s'affichait pas en ligne, avant de comprendre que l'erreur.
Cependant, j'ai tout au long de cet exercice beaucoup appris sur la démarche DevSecOps et me sens beaucouip plus à l'aide à l'idée de la reproduire sur d'autres projets.