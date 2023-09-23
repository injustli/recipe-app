FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_GOOGLE_CLIENT_ID=728647252293-t652fqffhmp8pdle42ve08bee5so4f0j.apps.googleusercontent.com
ENV MONGODB_URI=mongodb+srv://justinhanyueli:B1g4TC3NuP0UkuGo@cluster.5lxangg.mongodb.net/Recipes?retryWrites=true&w=majority

EXPOSE 8000

CMD ["npm", "docker-build-web-app"]
