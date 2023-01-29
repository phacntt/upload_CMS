#!/bin/sh

# sync database
echo "synchronizing db..."
npx prisma migrate reset
yarn prisma:migrate
# start server
echo "initialize server..."
node dist/index.js