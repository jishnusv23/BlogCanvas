FROM  node:alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -al

RUN npm run build

EXPOSE 8002

CMD [ "npm", "start" ]