FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_GOOGLE_CLIENT_ID=728647252293-t652fqffhmp8pdle42ve08bee5so4f0j.apps.googleusercontent.com
ENV MONGODB_USER=justinhanyueli
ENV MONGODB_PASS=B1g4TC3NuP0UkuGo
ENV MONGODB_DB=Recipes

EXPOSE 8080

CMD ["npm", "run", "docker-build-webapp"]
