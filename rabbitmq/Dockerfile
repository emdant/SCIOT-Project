FROM rabbitmq:management-alpine

RUN rabbitmq-plugins enable --offline rabbitmq_prometheus
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt
RUN rabbitmq-plugins enable --offline rabbitmq_web_mqtt