include .env
export $(shell sed 's/=.*//' .env)
export GROUPID=$(shell id -g)
export USERID=$(shell id -u)

FOLDER_NAME=$(shell basename $(CURDIR))

SERVICE_NAME=$(FOLDER_NAME)-app-1
IMAGE_NAME=$(FOLDER_NAME)-app
VOLUME_ROOT_HOME=$(FOLDER_NAME)_root-home
VOLUME_USER_HOME=$(FOLDER_NAME)_user-home

up:
	docker compose up

down:
	docker compose down

bash:
	docker compose run --rm app "bash"

sudo:
	docker compose run -u root --rm app "bash"

clean: clean-services clean-image clean-volumes

clean-services:
	echo "Stopping and removing all services from this folder..."
	docker compose down
	docker compose rm

clean-image:
	echo "Removing image: $(IMAGE_NAME)..."
	docker image rm $(IMAGE_NAME)

clean-volumes:
	echo "Removing volumes: $(VOLUME_ROOT_HOME), $(VOLUME_USER_HOME)..."
	docker volume rm $(VOLUME_ROOT_HOME) $(VOLUME_USER_HOME)
