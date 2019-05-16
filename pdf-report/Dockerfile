FROM node:alpine

ENV NODE_ENV production

WORKDIR /app
ADD . .

EXPOSE 3000
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]