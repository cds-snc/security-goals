FROM node:alpine AS build-env
RUN mkdir /app 
ADD . /app/
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run-script build
RUN pwd

FROM node:alpine
COPY --from=build-env /app/main-alpine /
CMD ["/main-alpine"]