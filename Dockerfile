FROM node:7-alpine
RUN apk update && apk add -y curl

ADD . /data
WORKDIR /data
RUN npm install

HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost:8080/ || exit 1

CMD node main.js

EXPOSE 8080
