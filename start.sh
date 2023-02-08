#!/bin/sh

# sync database
echo "synchronizing db..."
yarn prisma:migrate
yarn prisma:seed
# start server
echo "initialize server..."
node dist/src/index.js