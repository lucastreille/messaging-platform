#!/bin/sh

until nc -z -v -w30 postgres 5432
do
  echo "Waiting for Postgres to start..."
  sleep 1
done

echo "Postgres is up. Running Prisma generate and migrations..."
npx prisma generate
npx prisma migrate deploy

echo "Starting NestJS app..."
node dist/main.js
