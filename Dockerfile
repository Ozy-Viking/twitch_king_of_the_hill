# syntax=docker/dockerfile:1
FROM nginx:latest

WORKDIR /usr/share/nginx
RUN mkdir -p /usr/share/nginx/static

COPY website/static /usr/share/nginx/static
COPY website/*.html /usr/share/nginx/html
COPY nginx /etc/nginx

SHELL ["bash", "-i"]

EXPOSE 80