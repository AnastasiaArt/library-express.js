FROM node:12.22.7

WORKDIR /app

COPY . /app

RUN npm install
CMD ["npm", "start"]