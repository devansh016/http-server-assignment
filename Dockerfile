FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN node generateTextFile.js
EXPOSE 8080
CMD ["node", "index.js"]