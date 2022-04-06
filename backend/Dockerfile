FROM node:17

RUN apt-get update && apt-get upgrade -y

WORKDIR /scopio-backend

COPY package.json /scopio-backend/

RUN yarn

RUN yarn global add sequelize-cli

RUN yarn sequelize db:migrate

COPY . .

USER node

CMD yarn server
