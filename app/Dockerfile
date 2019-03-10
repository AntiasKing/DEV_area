FROM node:latest
ENV NODE_ENV dev
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --dev --silent && mv node_modules ../
COPY . .
CMD npm i -g expo-cli && expo login -u antiaskid -p Antoine2896 && expo build:android