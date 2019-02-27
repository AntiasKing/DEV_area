FROM node:8.15.0-alpine
ENV NODE_ENV dev
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --dev --silent && mv node_modules ../
COPY . .
EXPOSE 8080
CMD npm start