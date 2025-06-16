#!/bin/sh

echo "Checking Redis connection..."

node check-redis.js
if [ $? -ne 0 ]; then
  echo "Redis connection test failed, exiting."
  exit 1
fi

echo "Running Prisma generate and migrations..."
# npx prisma generate
# npx prisma migrate deploy --schema=src/prisma/schema.prisma

echo "Starting NestJS app..."
node dist/main.js
