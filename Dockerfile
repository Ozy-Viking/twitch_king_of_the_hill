# syntax=docker/dockerfile:1
FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html

COPY website/ .

EXPOSE 80