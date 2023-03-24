FROM node:16-alpine as builder
WORKDIR /vue-client
COPY package.json ./
RUN npm i --force
COPY . /vue-client
RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /vue-client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]