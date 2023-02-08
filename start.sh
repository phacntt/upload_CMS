#!/bin/sh

# sync database
echo "synchronizing db..."
# yarn prisma:migrate
npx prisma migrate reset -f
# start server
echo "initialize server..."
node dist/index.js