FROM node:14

WORKDIR /

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN yarn

CMD ["yarn", "start"]
