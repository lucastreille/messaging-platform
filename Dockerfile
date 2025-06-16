FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
COPY tsconfig.json ./

COPY src/prisma ./src/prisma
COPY .env /app/config/

RUN npm run build

RUN npx prisma generate --schema=src/prisma/schema.prisma

FROM node:18-alpine

WORKDIR /app


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/test ./test
COPY --from=builder /app/tsconfig.json ./

COPY --from=builder /app/src/prisma ./src/prisma

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
