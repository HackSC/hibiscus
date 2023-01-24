FROM node:16 AS BUILD_IMAGE

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn nx run log-server:build:production

FROM node:16-alpine

COPY --from=BUILD_IMAGE /app/dist/ ./dist/

CMD [ "node", "dist/apps/log-server/main.js" ]