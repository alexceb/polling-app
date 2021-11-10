FROM node:14 as builder

# Create app directory
WORKDIR /app/polling

# Installing dependencies
COPY . .

RUN yarn install
RUN yarn build

COPY --from=builder /app/polling/node_modules node_modules
COPY --from=builder /app/polling/.next .next
COPY --from=builder /app/polling/public public
COPY --from=builder /app/polling/next.config.js next.config.js

WORKDIR /app/polling

EXPOSE 8080
CMD [ "node" ]
