FROM node:16

WORKDIR /usr/src/app

COPY package*.json .

COPY . .

RUN yarn install

EXPOSE 8080

RUN yarn prisma generate

CMD ["yarn","start"]