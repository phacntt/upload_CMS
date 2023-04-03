FROM node:alpine

WORKDIR /usr/src/app/upload_CMS

COPY ./package*.json ./
COPY ./prisma ./prisma

RUN yarn
RUN npx prisma generate
COPY . .
RUN yarn build

RUN ["chmod", "+x", "start.sh"]

ENTRYPOINT ["./start.sh"]