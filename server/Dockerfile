FROM node:latest

WORKDIR /server

COPY package*.json ./

RUN npm i

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
