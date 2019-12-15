FROM node:lts

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json

RUN ls -lh

RUN npm i

EXPOSE 5000

CMD [ "node", "./src" ]