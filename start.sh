#!/bin/sh

# sync database
echo "synchronizing db..."
npx prisma migrate reset
# yarn prisma:migrate
npx prisma migrate dev
# start server
echo "initialize server..."
node dist/index.js