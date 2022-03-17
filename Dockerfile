FROM node:14.17.0-alpine

LABEL maintainer="dev@crowdlinker.com"

WORKDIR /main

COPY package.json package-lock.json ./

COPY . .

RUN chmod +x .

CMD npm install && npm run start