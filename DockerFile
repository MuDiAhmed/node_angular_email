FROM node:10
RUN npm install -g @angular/cli
ENV NODE_CONFIG_DIR ./configs 
ENV PORT 4300
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
WORKDIR /app/frontend
RUN npm install
RUN ng build --prod
WORKDIR /app
CMD node index.js
EXPOSE 4300