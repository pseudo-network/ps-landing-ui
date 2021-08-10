service := ps-landing-ui
version := 0.0.20
gcloud_proj_id := sylvan-bonbon-317613
cluster-dev := ps-dev
docker-image := gcr.io/${gcloud_proj_id}/${service}:${version}
root := $(abspath $(shell pwd))
port := 80

list:
	@grep '^[^#[:space:]].*:' Makefile | grep -v ':=' | grep -v '^\.' | sed 's/:.*//g' | sed 's/://g' | sort

docker-build:
	docker build -t $(docker-image) .

docker-dev:
	make docker-build
	make docker-run

docker-push:
	docker push $(docker-image)

docker-run:
	@docker run -itp $(port):$(port)  $(docker-image)

bumpversion-patch:
	bumpversion patch --allow-dirty

bootstrap-deploy-dev:
	gcloud container clusters get-credentials ${cluster-dev} --zone us-central1-c --project ${gcloud_proj}
	make docker-build
	make docker-push
	kubectl create -f deployments/k8s/service.yml
	kubectl create -f deployments/k8s/deploy.yml

deploy-dev:
	git add .
	git commit -m "${version}"
	git push origin master
	gcloud container clusters get-credentials ${cluster-dev} --zone us-central1-c --project ${gcloud_proj}
	make docker-build
	make docker-push
	kubectl apply -f deployments/k8s/deploy-dev.yml

purge:
	go clean
	rm -rf $(root)/vendor