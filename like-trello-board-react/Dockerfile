FROM node:8.9

WORKDIR /app
EXPOSE 3010

ADD public public

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install

ADD src src