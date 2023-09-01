FROM node:14.16.1-alpine3.11 as build
ARG commit_id
ARG google_maps_key
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN echo -e "\ 
REACT_APP_CARE_PORTAL_GIT_VERSION=$commit_id \n\
REACT_APP_CARE_PORTAL_GOOGLE_API_KEY=$google_maps_key" > .env && cat .env && npm install --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]