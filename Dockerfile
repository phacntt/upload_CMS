FROM node:alpine

WORKDIR /usr/src/app/upload_CMS

COPY ./package*.json ./
COPY ./prisma ./prisma

RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build

RUN ["chmod", "+x", "start.sh"]

ENTRYPOINT ["./start.sh"]