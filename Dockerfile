FROM node:14.17.4

CMD ["echo", "Hi Elliot! - container created :)"]

WORKDIR /Madrone

PATH PORT 3000

COPY package.json /Madrone/package.json

RUN npm install

COPY . /Madrone

CMD