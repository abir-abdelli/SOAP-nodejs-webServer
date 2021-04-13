FROM node:latest

RUN mkdir -p /usr/src/app
RUN npm install -g npm@7.8.0


WORKDIR  /urs/src/app

COPY package.json ./

RUN npm install 

COPY  . .

EXPOSE 8000

CMD ["npm", "start"]