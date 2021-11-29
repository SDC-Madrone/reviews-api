FROM node:latest

WORKDIR /sdc_reviews_api

COPY package.json /sdc_reviews_api

RUN npm install

COPY . /sdc_reviews_api

EXPOSE 4000

CMD ["npm", "start"]
