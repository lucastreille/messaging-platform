# Étape 1 : Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copie des fichiers de config + dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm ci

# Copie du code source + Prisma
COPY . .
COPY prisma ./prisma

# Build de l'app NestJS
RUN npm run build

# Génère le client Prisma
RUN npx prisma generate

# Étape 2 : Image de production
FROM node:18-alpine

WORKDIR /app

# Copie uniquement ce qui est nécessaire pour lancer l'app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# (Optionnel) Regénérer Prisma en cas d’outils runtime
RUN npx prisma generate

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]
