FROM node:10.12.0
USER node
COPY driver-gateway /nebulae/tpi/driver-gateway
WORKDIR /nebulae/tpi/driver-gateway
RUN npm install --prod
CMD [ "npm","start" ]
