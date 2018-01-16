install:
	docker-compose build --no-cache

run:
	docker-compose up

clean:
	docker-compose stop
	docker-compose down --rmi local --volumes --remove-orphans