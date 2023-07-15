# Twitch King of the Hill

King of the Hill game for Twitch Streams.

## Docker Container

```bash
docker compose up -d
```
image: [ozyviking/twitch-king-of-the-hill](https://hub.docker.com/repository/docker/ozyviking/twitch-king-of-the-hill/)

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

#### Streamer.bot webstream port

To change the port to what the streamer bot is listening on, change it by search parameters in the url.

http://localhost:28080/?wsPort=8080

wsPort: Websocket port of streamer bot set in streamer bot. Default is 8080.

#### Streamer.bot Server

If streamer.bot is on a different server to you gaming machine use the search parameter `server`.

http://localhost:28080/?server=192.168.0.10

#### Game Length

To change the game length from 60 seconds use the search parameter gameLength.

http://localhost:28080/?gameLength=60

Bug: When game length is 10 message doesn't show.

#### Champion title and Hill name

http://localhost:28080/?championName=King&hillName=Hill

#### Probability of Sexy Thong

Probability of a thong (flip flop) being a thong (g-string) (1 in x). Default is 10000 i.e. 1/10000.

http://localhost:28080/?gstringProb=10000

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

- [ ] Track win record
- [ ] Stats in the stream so far
- [ ] Kill messages on the top left like COD


## Videos

https://www.youtube.com/watch?v=VzQjQVTmSwQ
https://www.youtube.com/watch?v=NO3Vl7nApgc

---

## Acknowlegements

Inspired as a birthday gift for Ostrogothia (https://twitch.tv/Ostrogothia). 
Original author is VRFlad: [Champion of the Hill](https://vrflad.com/champion)

### Sound 
This game uses these sounds from [freesound.org](freesound.org).

Battle sounds mixed from:
- https://freesound.org/people/madmanmusic/sounds/347981/
- https://freesound.org/people/freefire66/sounds/175950/
- https://freesound.org/people/klavo1985/sounds/349382/

War horn from: 
- https://freesound.org/people/DeVern/sounds/512490/

Yeet sounds from:
- https://freesound.org/people/unfa/sounds/588557/
- https://freesound.org/people/Alivvie/sounds/555627/
- https://freesound.org/people/hisoul/sounds/520275/
- https://freesound.org/people/hisoul/sounds/520268/

Cheer from:
- https://freesound.org/people/BeeProductive/sounds/430046/