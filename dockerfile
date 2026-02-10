# ───────────────────────────────
# STAGE 1: Build
# ───────────────────────────────
FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG DATABASE_URL

ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Debug temporaire (optionnel mais conseillé)
RUN echo "SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL"

RUN npm run build


# ───────────────────────────────
# STAGE 2: Production
# ───────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

EXPOSE 3000
CMD ["npm", "run", "start"]
