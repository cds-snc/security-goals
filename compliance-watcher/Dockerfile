FROM node:11-alpine AS build-env
ADD . /app
WORKDIR /app
RUN npm install 

FROM node:11-alpine
MAINTAINER Max Neuvians <max.neuvians@cds-snc.ca>
USER node

ENV NODE_ENV production

COPY --from=build-env --chown=node /app /app
WORKDIR /app
EXPOSE 3000
CMD npm start
