# build environment
FROM nginx:latest

COPY /css /usr/share/nginx/html/css
COPY /dev /usr/share/nginx/html/dev
COPY /img /usr/share/nginx/html/img
COPY /js /usr/share/nginx/html/js
COPY /php /usr/share/nginx/html/php
COPY /vendor /usr/share/nginx/html/vendor
COPY /index.html /usr/share/nginx/html
COPY /index.html /usr/share/info

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]