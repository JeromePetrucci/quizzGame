FROM node:18.16-alpine3.16
WORKDIR /app
COPY package*.json ./
RUN npm install


COPY . .

RUN npm run build --prod

FROM nginx:alpine
COPY --from=0 . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]