FROM node:latest
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 3306
RUN npm start

CMD [ "npm", "start" ]