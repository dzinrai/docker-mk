FROM node:14.5.0
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3071
CMD [ "node", "index.js"]