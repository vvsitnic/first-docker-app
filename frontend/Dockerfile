FROM node:24 AS build-phase
ARG BACKEND_API
WORKDIR /app
COPY . .
RUN npm install && \
    npm run build

FROM node:24
EXPOSE 5000
WORKDIR /app
COPY --from=build-phase /app/dist/ /app/dist
RUN npm install -g serve
USER node
ENTRYPOINT [ "serve", "-s", "-l", "5000", "dist" ]