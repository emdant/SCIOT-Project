FROM ubuntu:latest

RUN apt-get update
RUN apt-get -y install \
  curl \
  grep \
  wget \
  sudo \
  apt-utils

RUN curl -fsSL https://get.docker.com -o get-docker.sh
RUN sh get-docker.sh

WORKDIR /usr/app

RUN curl -s https://api.github.com/repos/nuclio/nuclio/releases/latest \
  | grep -i "browser_download_url.*nuctl.*$(uname)-amd" \
  | cut -d : -f 2,3 \
  | tr -d \" \
  | wget -O nuctl -qi - && chmod +x nuctl

COPY get-person.yaml get/function.yaml
COPY scan-person.yaml scan/function.yaml
COPY startup.sh .

CMD [ "./startup.sh" ]