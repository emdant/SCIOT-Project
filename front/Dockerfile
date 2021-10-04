FROM node:lts-alpine

WORKDIR /usr/src/app
COPY . .
EXPOSE 5000
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]