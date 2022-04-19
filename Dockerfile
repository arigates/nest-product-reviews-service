FROM node:14.18-alpine

COPY . /var/www/

WORKDIR /var/www

RUN cp .env.example .env

RUN npm install -g @nestjs/cli
RUN npm install
RUN npm run build

CMD [ "npm", "run", "start:prod"]