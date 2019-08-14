FROM node:10.15.0

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3002

RUN yarn

CMD ["yarn", "start:node"]