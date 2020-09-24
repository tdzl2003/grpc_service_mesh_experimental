FROM node:12

WORKDIR /user/src/app

COPY ./gate/package*.json ./

RUN npm install

COPY ./proto ../proto

COPY ./gate/src ./src
