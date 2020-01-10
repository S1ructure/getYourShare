FROM node:latest

# make the 'app' folder the current working directory
WORKDIR /app

COPY ./docker/dev/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]