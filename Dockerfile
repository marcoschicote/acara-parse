FROM node:boron

# Create app directory
RUN mkdir acara-parse

ADD . /acara-parse
WORKDIR /acara-parse

ENV PORT=1337

EXPOSE 1337

RUN npm install
CMD ["node", "app.js" ]
