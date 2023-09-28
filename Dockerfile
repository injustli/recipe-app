FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG ARG1
ENV REACT_APP_GOOGLE_CLIENT_ID=${ARG1}

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
