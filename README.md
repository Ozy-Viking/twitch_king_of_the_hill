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

## Weapon Calls

This is an example of the setup for a weapon.

```js
'thong': {
        'file': 'thong.png',
        'left': 'transform: rotate(30deg) translate(10px,-60px)',
        'right': 'transform: rotate(-30deg) translate(-10px,-60px)',
        'command': ['thong', 'flip flop', 'formal thong', 'safety boot']
    },
```

- The display name is what will be displayed to the end user i.e. 'number 1 fan finger' is the name of the object. This is auto added as the name in the object i.e. weapon.name.
- file: the name of the picture within the images folder (`./static/images`).
- left: This is the css used when entering from the left.
- right: This is the css used when entering from the right.
- command: These are the smallest parts, that a user can declare so the system can recognise what they want. Regex is used and the must be in lowercase otherwise they will never be used. Note: if pan is used then no command with pan is usable. If you want to add a command as a priority over another weapons use of it, have that weapon declared higher in the code. 

> If you want to flip/invert the image, use ` scaleX(-1)`.

Use:

```
{joinCommand} with an amazing FOrmaL ThoNG
```

Caps does not matter for the user. 

For Doughnut, both american and british spelling were added. I highly recommend doing so for any other ambiguities. 

---

## Ideas

- [ ] Kill messages on the top left like COD
- [ ] Add rigged users 
- [x] regex weapon choice
- [ ] Track win record
