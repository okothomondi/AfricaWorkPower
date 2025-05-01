# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci

# Copy source files
COPY src ./src

# Create empty .env if not exists (prevents build failure)
RUN touch .env.example

# Build the application
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env.example ./

# Copy only essential files
COPY package.json ./

# Environment setup
ENV NODE_ENV=production
ENV PORT=3000

# Create production .env (override in deployment)
RUN cp .env.example .env

EXPOSE 3000

CMD ["node", "dist/server.js"]