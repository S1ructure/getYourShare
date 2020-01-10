#!/bin/sh/
sudo docker build --no-cache . -t my-app
sudo docker rm -f share-app || true && docker run --name share-app -d -p 8082:80 my-app
