db-up:
	docker-compose up -d

db-down:
	docker-compose down

migrate:
	@export DATABASE_URL=$$(grep DATABASE_URL_LOCAL .env | cut -d '=' -f2 | xargs) && npx prisma migrate dev --name $${name}
