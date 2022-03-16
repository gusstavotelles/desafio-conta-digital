FROM node:14.17.0-alpine

LABEL maintainer="dev@crowdlinker.com"

# Create app directory
WORKDIR /main

# Install app dependencies - For NPM use: `COPY package.json package-lock.json ./`
COPY package.json package-lock.json ./


# Copy important files - Add ormconfig.ts here if using Typeorm
COPY . .

RUN chmod +x .

# You can update this to run other NodeJS apps
CMD npm install && npm run start