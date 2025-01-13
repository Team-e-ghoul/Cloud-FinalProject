# Steps

## First start minikube

```bash
minikube start
```

## Then uninstall the previous helm installation

```bash
helm uninstall release1
```

## Then run the minikube tunnel (for load balancer)

```bash
minikube tunnel &
```

## Then install the new release

```bash
helm install release1 ./docker-compose
```

## Then watch for the pod status

```bash
minikube kubectl -- get pods -A
```

## Then watch the services

```bash
minikube kubectl -- get services
```

## Extract the external ip from backend and put it in the `send_request.sh` file

## Then run the `send_request.sh` file

```bash
./send_request.sh
```


## Get a shell from a pod

```bash
minikube kubectl -- exec -it PODNAME -- /bin/bash
```


## View DB

First get a shell, then run:

```bash
psql -U postgres -d testdb
```


gitlab username: k3rn3lpanic
gitlab password: gipuhpoJcpe31!
