FROM node:10.12.0
COPY driver-gateway /nebulae/tpi/driver-gateway
WORKDIR /nebulae/tpi/driver-gateway
RUN npm install --prod
USER node
CMD [ "npm","start" ]
