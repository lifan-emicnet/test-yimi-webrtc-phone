FROM registry.cn-beijing.aliyuncs.com/web-cm/base-node16:18-alpine3.19
RUN mkdir /app
WORKDIR /app
COPY package*.json /app
RUN npm ci --registry=https://registry.npmjs.com
COPY . /app
RUN npm run prephonebar
EXPOSE 9000
CMD ["npm", "run", "phonebar"]
