# Plateforme de Messagerie Instantanée - Architecture Backend

Ce document décrit l'architecture backend de notre plateforme de messagerie instantanée développée avec NestJS et GraphQL.

## Architecture et Backend Principal

Cette partie du projet couvre :
- Configuration initiale de NestJS
- Mise en place de l'architecture modulaire
- Configuration de GraphQL (code first)
- Développement des modèles de données (Utilisateur, Conversation, Message)
- Implémentation des résolveurs GraphQL de base

## Prérequis

- Node.js (v16 ou supérieur)
- npm (v7 ou supérieur)
- Docker et Docker Compose (pour Redis)

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd messaging-platform

# Installer les dépendances
npm install

# Démarrer Redis (nécessaire pour BullMQ)
docker-compose up -d

# Démarrer l'application en mode développement
npm run start:dev
```

L'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000).

## Structure du Projet

```
src/
├── user/                     # Module Utilisateur
│   ├── models/               # Modèles GraphQL
│   │   └── user.model.ts     # Définition du modèle User
│   ├── dto/                  # Data Transfer Objects
│   │   └── create-user.input.ts # DTO pour création d'utilisateur
│   ├── user.resolver.ts      # Résolveur GraphQL
│   ├── user.service.ts       # Service avec logique métier
│   └── user.module.ts        # Module NestJS
├── conversation/             # Module Conversation (structure similaire)
├── message/                  # Module Message (structure similaire)
├── health/                   # Contrôleur Health Check (REST)
├── health-check/             # Module Health Check (GraphQL)
└── app.module.ts             # Module principal de l'application
```

## Modèles de Données

### User

```typescript
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field(() => [Conversation], { nullable: true })
  conversations?: Conversation[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
```

### Conversation

```typescript
@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field(() => [User])
  participants: User[];

  @Field(() => [Message], { nullable: true })
  messages?: Message[];

  @Field()
  lastActivity: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
```

### Message

```typescript
@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => User)
  sender: User;

  @Field(() => Conversation)
  conversation: Conversation;

  @Field(() => Boolean, { defaultValue: false })
  isRead: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
```

## API GraphQL

L'API GraphQL est accessible à l'adresse [http://localhost:3000/graphql](http://localhost:3000/graphql).

### Queries

#### Health Check

```graphql
query {
  healthCheck {
    result
  }
}
```

#### Récupérer tous les utilisateurs

```graphql
query {
  users {
    id
    username
    email
    avatarUrl
  }
}
```

#### Récupérer un utilisateur par ID

```graphql
query {
  user(id: "user_id") {
    id
    username
    email
    avatarUrl
  }
}
```

#### Récupérer les conversations d'un utilisateur

```graphql
query {
  userConversations(userId: "user_id") {
    id
    title
    participants {
      id
      username
    }
    lastActivity
  }
}
```

#### Récupérer les messages d'une conversation

```graphql
query {
  conversationMessages(conversationId: "conversation_id") {
    id
    content
    sender {
      id
      username
    }
    isRead
    createdAt
  }
}
```

### Mutations

#### Créer un utilisateur

```graphql
mutation {
  createUser(createUserInput: {
    username: "john_doe",
    email: "john@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=john"
  }) {
    id
    username
    email
  }
}
```

#### Créer une conversation

```graphql
mutation {
  createConversation(createConversationInput: {
    title: "Project Discussion",
    participantIds: ["user_id_1", "user_id_2"]
  }) {
    id
    title
    participants {
      id
      username
    }
  }
}
```

#### Envoyer un message

```graphql
mutation {
  createMessage(
    createMessageInput: {
      content: "Hello, how are you?",
      conversationId: "conversation_id"
    },
    senderId: "user_id"
  ) {
    id
    content
    sender {
      id
      username
    }
    conversation {
      id
      title
    }
  }
}
```

## Implémentation Actuelle

L'implémentation actuelle utilise un stockage en mémoire pour les données. Dans les prochaines étapes, nous intégrerons :
- BullMQ pour la gestion des files d'attente de messages
- Prisma avec PostgreSQL pour la persistance des données
- Authentification avec Auth0
- WebSockets pour les notifications en temps réel

## Prochaines Étapes

1. **Intégration de Message Queuing**
   - Intégration de BullMQ pour les messages
   - Mise en place de workers pour traiter les messages

2. **Tests**
   - Écriture de tests unitaires avec Jest
   - Mise en place de tests d'intégration

3. **CI/CD**
   - Configuration de GitHub Actions
   - Déploiement automatisé

## Collaboration

Ce module s'intègre avec les autres parties du projet :
- **Frontend** : Utilise cette API GraphQL pour l'interface utilisateur
- **Messaging** : Intègre Redis et BullMQ pour la gestion des messages
- **DevOps** : Configure CI/CD et déploiement

## Commandes Utiles

```bash
# Générer un nouveau module
nest generate module module-name

# Générer un resolver
nest generate resolver module-name

# Générer un service
nest generate service module-name

# Lancer les tests
npm run test

# Build pour production
npm run build
```