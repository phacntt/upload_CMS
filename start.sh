#!/bin/sh

# sync database
echo "synchronizing db..."
npx prisma migrate reset -f
yarn prisma:migrate
# start server
echo "initialize server..."
node dist/index.js