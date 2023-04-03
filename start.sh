#!/bin/sh

# sync database
echo "synchronizing db..."
npm run prisma:migrate
npm run prisma:seed
# start server
echo "initialize server..."
node dist/src/index.js