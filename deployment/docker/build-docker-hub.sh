#!/bin/bash
export DOCKERHUB_IMAGE=drivergateway
export DOCKERHUB_TAG=0.3.9

rm -rf deployment/docker/driver-gateway/
cp -R $API_SHELL_PATH/driver-gateway deployment/docker/driver-gateway

docker build -m "300M" -t $DOCKERHUB_NAMESPACE/$DOCKERHUB_IMAGE:$DOCKERHUB_TAG -t $DOCKERHUB_NAMESPACE/$DOCKERHUB_IMAGE:latest deployment/docker/
docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS
docker push $DOCKERHUB_NAMESPACE/$DOCKERHUB_IMAGE:$DOCKERHUB_TAG
docker push $DOCKERHUB_NAMESPACE/$DOCKERHUB_IMAGE:latest