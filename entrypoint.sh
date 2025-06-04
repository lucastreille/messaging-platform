#!/bin/sh

until nc -z -v -w30 postgres 5432
do
  echo "Waiting for Postgres to start..."
  sleep 1
done

echo "Postgres started, running migrations..."
npx prisma migrate deploy

echo "Starting the NestJS app..."
node dist/main.js
