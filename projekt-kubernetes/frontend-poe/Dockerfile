FROM debian:bookworm-slim

RUN apt-get update && \
    apt-get install -y apache2 openssl gettext-base && \ 
    apt-get clean && \
    a2ensite default-ssl && \
    a2enmod ssl proxy proxy_http && \   
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p certs

COPY ssl/openssl.cnf /etc/ssl/certs/

RUN openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout /etc/ssl/private/apache.key \
  -out /etc/ssl/certs/apache.crt \
  -config /etc/ssl/certs/openssl.cnf
 
COPY config/vhost.conf /etc/apache2/sites-available/my-site.conf


COPY site/index.html /var/www/html/index.html.template
COPY site/tlo.jpg /var/www/html/tlo.jpg

ENV CONTENT_API_URL=http://backend:3001
RUN envsubst '$CONTENT_API_URL' < /var/www/html/index.html.template > /var/www/html/index.html

RUN a2ensite my-site.conf && a2dissite 000-default.conf
RUN chmod -R 755 /var/www/html

EXPOSE 80 443

CMD ["apache2ctl", "-D", "FOREGROUND"]