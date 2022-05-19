# build stage
FROM node:13.12.0-alpine as build-stage
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY /dart-cart-client/package*.json /app/
RUN npm install --silent
RUN npm install serve
COPY /dart-cart-client /app

#CMD ["npm","start"]
RUN npm run build

CMD ["serve", "-s", "build", "-l", "80"]


## final stage
#FROM nginx:stable-alpine
#COPY --from=build-stage /app/build /usr/share/nginx/html
## Copy the default nginx.conf provided by tiangolo/node-frontend
#CMD ["nginx", "-g", "daemon-off;"]
