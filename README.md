# Twitch King of the Hill

King of the Hill game for Twitch Streams.

## Docker Container

```bash
docker compose up -d
```

To change the port of the to container, default is 28080.

Change the user port in the `docker-compose.yaml` not the container port.
```yaml 
...
    ports:
      - 28080:80
...
```

## URL

### Standard

http://localhost:28080/

### Modification

To change the port to what the streamer bot is listening on, change it by search parameters in the url.

http://localhost:28080/?wsPort=8080

wsPort: Websocket port of streamer bot set in streamer bot. Default is 8080.


## Ideas

- [ ] Kill messages on the top left like COD
- [ ] Add rigged users 
- [x] regex weapon choice
