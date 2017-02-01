FROM node:7-alpine
RUN apk update && apk add -y curl

ADD . /data
WORKDIR /data
RUN npm install

HEALTHCHECK --interval=20s  --timeout=5s --retries=3 CMD curl -f http://localhost:8080/ || exit 1

CMD node main.js

EXPOSE 8080
