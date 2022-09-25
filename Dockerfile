FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
ENV SERVER_PORT 8080
CMD [ "npm", "run", "deploy" ]