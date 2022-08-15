FROM node:16-alpine

WORKDIR /app

COPY ./dist/apps/matchsc .

RUN yarn install --frozen-lockfile

CMD ["node", "main.js"]

