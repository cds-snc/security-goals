FROM node:alpine AS build-env
RUN mkdir /app 
ADD . /app/
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm build

FROM node:alpine
COPY /main /
CMD ["/main"]