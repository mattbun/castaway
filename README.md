# castaway

Perform actions when cast sessions start or end!

So far, it can:

* Post to MQTT
* Write to console

## Getting Started

[A docker image is available](https://hub.docker.com/repository/docker/mattbun/castaway). Get started by running

```shell
docker run --rm -it mattbun/castaway --help
```

## Configuration

Castaway can be configured by command line argument or by environment variable (perfect for docker-compose!).

### Command Line Arguments

```shell
docker run --rm -it mattbun/castaway \
  --host <address-of-cast-device> \
  --mqtt-broker <address-of-mqtt-broker> \
  --mqtt-topic 'cool/topic' \
  --mqtt-message-on-start 'session_connected' \
  --mqtt-message-on-end 'no_session' \
```

### Environment Variables (docker-compose)

Environment variables are prefixed with `CASTAWAY_` and follow the naming of the command line argument.

```yaml
services:
  castaway:
    container_name: castaway
    image: mattbun/castaway
    restart: unless-stopped
    environment:
      - CASTAWAY_HOST=<address-of-cast-device>
      - CASTAWAY_MQTT_BROKER=<address-of-mqtt-broker>
      - CASTAWAY_MQTT_TOPIC=cool/topic
      - CASTAWAY_MQTT_MESSAGE_ON_START=session_connected
      - CASTAWAY_MQTT_MESSAGE_ON_END=no_session
```
