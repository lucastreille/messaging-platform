# Dockerfile
FROM node:18

# Créer un dossier pour l'app
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Build de l'app NestJS
RUN npm run build

# Exposer le port (ex : 3000)
EXPOSE 3000

# Commande pour lancer l'app
CMD ["node", "dist/main"]
