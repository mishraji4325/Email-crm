FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app


# =========================
# Dependencies
# =========================

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/worker/package.json apps/worker/package.json
COPY apps/api/package.json apps/api/package.json

RUN pnpm install --frozen-lockfile


# =========================
# Build
# =========================

FROM deps AS builder

COPY . .

RUN pnpm --filter api exec prisma generate

RUN pnpm --filter worker build


# =========================
# Production
# =========================

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/worker/dist ./apps/worker/dist
COPY --from=builder /app/apps/worker/package.json ./apps/worker/package.json
COPY --from=builder /app/apps/worker/node_modules ./apps/worker/node_modules
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 5001

CMD ["node", "apps/worker/dist/index.js"]