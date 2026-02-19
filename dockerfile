# ───────────────────────────────
# STAGE 1: Build
# ───────────────────────────────
FROM node:20-alpine AS builder

# Variables d'environnement
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG DATABASE_URL

ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm ci

# Copier le code source
COPY . .

# Build de l'app
RUN npm run build

# ───────────────────────────────
# STAGE 2: Production
# ───────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Créer un utilisateur non-root
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copier les fichiers nécessaires depuis le build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Installer uniquement les dépendances de production
RUN npm ci --omit=dev

# Changer le propriétaire
RUN chown -R nextjs:nextjs /app
USER nextjs

EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
