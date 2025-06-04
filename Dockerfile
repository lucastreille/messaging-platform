# Étape 1 : Builder (build de NestJS + Prisma + tests)
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Installer les dépendances
COPY package*.json ./
RUN npm ci

# 2. Copier tout le code nécessaire
COPY . .
COPY prisma ./prisma
COPY src ./src
COPY test ./test
COPY tsconfig.json ./

# 3. Compiler le projet
RUN npm run build

# 4. Générer le client Prisma
RUN npx prisma generate

# Étape 2 : Image de production
FROM node:18-alpine

WORKDIR /app

# 5. Copier les fichiers buildés + configs nécessaires
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/test ./test
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./

# 6. Regénérer Prisma dans l’image finale (optionnel mais sûr)
RUN npx prisma generate

# 7. Entrypoint de démarrage
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
