FROM node:alpine

ENV NODE_ENV production

WORKDIR /app
ADD . .

EXPOSE 3000
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]