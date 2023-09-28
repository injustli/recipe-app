FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG CLIENT_ID
ENV REACT_APP_GOOGLE_CLIENT_ID=$CLIENT_ID
RUN echo $CLIENT_ID

COPY . .

EXPOSE 8080

RUN npm run build

CMD ["npm", "start"]
