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

COPY apps/api/package.json apps/api/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN pnpm install --frozen-lockfile


# =========================
# Build
# =========================

FROM deps AS builder

COPY . .

RUN pnpm --filter api exec prisma generate

RUN pnpm --filter api build


# =========================
# Production
# =========================

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/api/dist ./apps/api/dist

COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

EXPOSE 5000

CMD ["node", "apps/api/dist/index.js"]