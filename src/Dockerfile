#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node . /usr/share/nginx/html

# Expose port 80
EXPOSE 4200

CMD ng serve