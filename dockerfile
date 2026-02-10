# ───────────────────────────────
# STAGE 1: Build
# ───────────────────────────────
FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG DATABASE_URL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV DATABASE_URL=$DATABASE_URL

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json / pnpm-lock.yaml
# (évite de réinstaller les deps si seulement le code change)
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier tout le projet
COPY . .

# Construire l'application Next.js en production
RUN npm run build

# ───────────────────────────────
# STAGE 2: Production
# ───────────────────────────────
FROM node:20-alpine AS runner

# Définir le répertoire de travail
WORKDIR /app

# Copier seulement les fichiers nécessaires depuis le builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Exposer le port de l'application Next.js
EXPOSE 3000

# Commande pour démarrer le serveur Next.js en production
CMD ["npm", "run", "start"]
