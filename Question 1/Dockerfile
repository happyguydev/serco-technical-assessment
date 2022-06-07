FROM node:16-alpine
RUN mkdir /app
COPY package.json yarn.lock /app/
WORKDIR /app
RUN yarn
COPY . .
CMD ["yarn", "dev", "--host", "--port", "4100"]
