FROM nginx:stable-alpine3.20-perl
WORKDIR /var/www/rentx.fr
COPY dist/angular .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
