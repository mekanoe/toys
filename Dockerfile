FROM mhart/alpine-node AS builder
RUN apk add --no-cache python make git && npm i -g yarn
COPY . /src
RUN cd /src && sh /src/.docker/build.sh

FROM nginx:mainline-alpine
RUN addgroup www && adduser -S -Gwww www
COPY ./.docker/nginx /etc/nginx
COPY --from=builder --chown=www:www /src/dist /dist