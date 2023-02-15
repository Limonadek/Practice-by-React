FROM node:16.17.1

WORKDIR /express-project

COPY package.json .
COPY package-lock.json .
RUN npm ci 

COPY app.js .
COPY classCarAndBuyer.js .
COPY classSalonCarchering.js .
