# This is a Nginx image for deployng OrVisual client app
#
FROM nginx:1.14

LABEL maintainer="Artemis Sirosh <ASir2089@gmail.com>"

COPY build/ /usr/share/nginx/html/

COPY nginx.template.conf /etc/nginx/

EXPOSE 80

STOPSIGNAL SIGTERM

CMD envsubst < /etc/nginx/nginx.template.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
