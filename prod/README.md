# RentX Production Build

This directory contains the production build of RentX application.

## Structure
- `angular/` - Angular frontend build
- `nestjs/` - NestJS backend build
- `docker-compose.yml` - Docker Compose configuration
- `default.conf` - Nginx configuration
- `.env` - Environment variables
- `keys/` - SSL/TLS certificates and keys

## Running locally
1. Make sure Docker and Docker Compose are installed
2. Run `docker-compose up` to start all services
3. Access the application at http://localhost

## Services
- Frontend: http://localhost
- Backend API: http://localhost/api
- Database: PostgreSQL running on port 5432
