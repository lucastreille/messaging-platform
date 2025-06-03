# Étape 1 : Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copie des fichiers de config + dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm ci

# Copie du code source
COPY . .

# Build de l'app NestJS
RUN npm run build

# Étape 2 : Image de production
FROM node:18-alpine

WORKDIR /app

# Copie uniquement ce qui est nécessaire pour lancer l'app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose le port (adapter si besoin)
EXPOSE 3000

# Commande de lancement
CMD ["node", "dist/main"]
