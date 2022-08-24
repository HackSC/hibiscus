FROM node:16 AS BUILD_IMAGE

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:16-alpine

COPY --from=BUILD_IMAGE /app/dist/ ./dist/
COPY package.json .

CMD [ "yarn", "serve:production" ]