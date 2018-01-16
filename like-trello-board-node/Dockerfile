FROM node:8.9

WORKDIR /app
EXPOSE 3000

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install

ADD src src