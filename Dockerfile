 FROM node:14-alpine

 WORKDIR /app
 
 COPY package.json .

 COPY package-lock.json .

 RUN npm ci


 COPY . .

 CMD ["npm","start"]

 EXPOSE 3000