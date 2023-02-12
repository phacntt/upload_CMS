#!/bin/sh

# sync database
echo "synchronizing db..."
# yarn prisma:migrate
# yarn prisma:seed
npx prisma migrate reset -f
# start server
echo "initialize server..."
node dist/src/index.js