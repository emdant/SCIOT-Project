# Run a container for rabbitmq in detached mode
docker run -d --rm --name rabbitmq -p 5672:5672 -p 15672:15672 emdant/rabbitmq
docker run -d --rm --detach --publish 8070:8070 --volume /var/run/docker.sock:/var/run/docker.sock --volume /tmp:/tmp --name nuclio-dashboard quay.io/nuclio/dashboard:stable-amd64