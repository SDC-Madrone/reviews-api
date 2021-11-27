FROM node:14.17.4

WORKDIR /Madrone

COPY package.json /Madrone/package.json

RUN npm install

COPY . /Madrone

CMD [ "echo", "Hi Elliot! - container created :)" ]