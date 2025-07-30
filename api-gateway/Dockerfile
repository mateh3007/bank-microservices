FROM node:22-alpine

RUN apk add --no-cache tzdata
ENV TZ=America/Sao_Paulo

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache yarn python3 make g++

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 3011

CMD ["yarn", "start:dev"]
