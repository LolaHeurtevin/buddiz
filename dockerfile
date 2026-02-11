# ───────────────────────────────
# STAGE 1: Build
# ───────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build app
RUN npm run build


# ───────────────────────────────
# STAGE 2: Production
# ───────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy only necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Change ownership
RUN chown -R nextjs:nextjs /app

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
