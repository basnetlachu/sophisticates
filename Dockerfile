# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-slim AS builder

WORKDIR /app

COPY sophisticates-react/package*.json ./

# Install all deps (including devDeps needed for vite build)
RUN npm ci

COPY sophisticates-react/ .

RUN npm run build

# ── Stage 2: Production ────────────────────────────────────────────────────────
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package files and install production deps only
COPY sophisticates-react/package*.json ./
RUN npm ci --omit=dev

# Copy built frontend and server from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

EXPOSE 3000

CMD ["node", "server/index.js"]
