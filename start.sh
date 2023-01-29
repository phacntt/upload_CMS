#!/bin/sh

# sync database
echo "synchronizing db..."
yarn prisma:migrate
# start server
echo "initialize server..."
node dist/index.js