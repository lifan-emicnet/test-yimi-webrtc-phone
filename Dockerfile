# FROM registry.cn-beijing.aliyuncs.com/web-cm/node:18
FROM node:18-alpine3.18
# FROM registry.cn-hangzhou.aliyuncs.com/library/node:18-alpine3.18
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --registry=https://registry.npmmirror.com
COPY . /app
RUN npm run pretoolbar
EXPOSE 9000
CMD ["npm", "run", "phonebar"]