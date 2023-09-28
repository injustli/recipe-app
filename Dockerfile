FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV REACT_APP_GOOGLE_CLIENT_ID=728647252293-t652fqffhmp8pdle42ve08bee5so4f0j.apps.googleusercontent.com

RUN npm run build

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
