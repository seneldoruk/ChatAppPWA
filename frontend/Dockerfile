FROM oven/bun:1 as build
WORKDIR /app

COPY ./package.json ./bun.lockb ./vite.config.ts ./tsconfig.node.json ./
COPY ./public ./public
COPY ./src ./src
COPY ./index.html ./index.html
RUN bun install --production
RUN bun vite build

FROM nginx:stable

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]