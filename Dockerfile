 FROM node:alpine

 WORKDIR '/app'

 COPY package.json .
 RUN npm install

 RUN npm install cors --save
 
 

 COPY . .
 
 CMD ["node", "index.js"]

 EXPOSE 3000