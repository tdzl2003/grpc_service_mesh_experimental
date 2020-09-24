FROM node:12

WORKDIR /user/src/app

COPY ./back/package*.json ./

RUN npm install

COPY ./proto ../proto

COPY ./back/src ./src
