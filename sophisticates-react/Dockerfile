# ─── Stage 1: Build the React Frontend ───────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install all deps (devDeps needed for vite build)
COPY package*.json ./
RUN npm ci

# Copy all source files and build the React app
COPY . .
RUN npm run build

# ─── Stage 2: Lean Production Runtime ─────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Only install production dependencies (skip devDeps)
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copy built React frontend from stage 1
COPY --from=builder /app/dist ./dist

# Copy Express backend server
COPY server ./server

# Copy all public assets (logo, chat-icon, favicon, etc.)
COPY public ./public

# The port Express listens on — override via environment variable in Hostinger
EXPOSE 3001

# Production mode: Express serves the built React app as static files
ENV NODE_ENV=production

# Start the Express server
CMD ["node", "server/index.js"]
