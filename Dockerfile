FROM node:12-alpine as builder

WORKDIR "/usr/src/app"

COPY package.json .

RUN npm install

COPY . .

# CMD ["npm", "run", "build"]
RUN npm run build


# Nginx Server

FROM nginx

EXPOSE 8080

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
