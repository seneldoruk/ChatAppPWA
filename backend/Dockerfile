FROM node:18.16.0-alpine3.17
RUN mkdir /app
WORKDIR /app
COPY ./src ./src
COPY ./prisma ./prisma
COPY ./tsconfig.json .
COPY ./package.json ./pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install  --prod
RUN pnpm prisma db push
EXPOSE 8000
CMD [ "pnpm", "start"]
