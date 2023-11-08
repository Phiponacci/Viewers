#!/bin/sh

if [ -n "$SSL_PORT" ]
  then
    envsubst '${SSL_PORT}:${PORT}' < /usr/src/default.ssl.conf.template > /etc/nginx/conf.d/default.conf
  else
    envsubst '${PORT}' < /usr/src/default.conf.template > /etc/nginx/conf.d/default.conf
fi

echo "Starting Nginx to serve the MCM RIS Viewer..."

exec "$@"
