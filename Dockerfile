# stage1 as builder
FROM node:15-alpine as builder

WORKDIR /app

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

COPY . .

# Build the project
RUN npm run ng build


FROM nginx:alpine

#!/bin/sh
COPY nginx /etc/nginx/

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/dist/otp-application/ /usr/share/nginx/html

# Copy run_nginx.sh
COPY nginx/run_nginx.sh /etc/nginx

EXPOSE 4200 80