#!/bin/sh

echo "Running Prisma generate and migrations..."
npx prisma generate
npx prisma migrate deploy

echo "Starting NestJS app..."
node dist/main.js
