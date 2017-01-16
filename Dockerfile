FROM node:7-alpine
ADD . /data
WORKDIR /data
RUN npm install
CMD node main.js

EXPOSE 8080
