FROM node:latest

ARG CONTAINER_UID
ARG CONTAINER_GID
RUN test -n "$CONTAINER_UID"
RUN test -n "$CONTAINER_GID"

RUN chown $CONTAINER_UID:$CONTAINER_GID /usr/local/lib/node_modules

RUN apt-get -y update && \
    apt-get install -y manpages-dev manpages man-db less nano

CMD ["sleep", "infinity"]