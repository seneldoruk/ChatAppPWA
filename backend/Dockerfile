FROM  jitesoft/node-yarn:20-slim

RUN mkdir /app
WORKDIR /app
COPY ./src ./src
COPY ./prisma ./prisma
COPY ./tsconfig.json .
COPY ./package.json ./yarn.lock ./

RUN yarn install --production
EXPOSE 8000
CMD ["yarn", "run", "start-docker"]
