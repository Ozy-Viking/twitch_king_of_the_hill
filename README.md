# Twitch King of the Hill

![GitHub release (with filter)](https://img.shields.io/github/v/release/Ozy-Viking/twitch_king_of_the_hill?label=Release)


King of the Hill game for Twitch Streams to engage their audience.

A live example or a stable version you can use in production/live: [https://ozy-viking.github.io/twitch_king_of_the_hill/](https://ozy-viking.github.io/twitch_king_of_the_hill/). It can be modified to your liking using the url modification below.

## Docker Container

Docker image: [ozyviking/twitch-king-of-the-hill](https://hub.docker.com/repository/docker/ozyviking/twitch-king-of-the-hill/)

### Images

- Stable: Built of main branch.
- Latest: More bleading edge / higher chance of bugs. Built off every push to github.
- Branch: Built of the lastest push in that branch.
- Tags: Built of tagged pushes ('v0.1.1') and will be a current/past stable.

### Docker Compose

```bash
docker compose up -d
```

To change the port of the to container, default is 28080, change the user port in the `docker-compose.yaml` not the container port, i.e. change the `28080`, not the `80`.

```yaml 
...
    ports:
      - 28080:80
...
```
### QNAP Conatainer Station

To set this container up on a QNAP, install Conatainer Station and then follow these steps:

1. Open Container station.
1. Click Create on the left.
1. Search 'twitch-king-of-the-hill'.
1. Select Docker Hub, you should see 'ozyviking/twitch-king-of-the-hill'.
1. Click install.
1. Change image version to stable (or your preference).
1. Click Advanced Settings.
1. Click 'network'.
1. Next to port forwarding click 'Add'.
1. Under 'Host' type '28080'.
1. Under 'Container' type '80'.
1. Click create.

You should be able to access the website on:

http://[QNAP IP addess]:28080/

## URL

### Standard

http://localhost:28080/

### Modifications

To have multiple modifications, simply use an `&` between terms.

http://localhost:28080/?wsPort=8080&gameLength=60

The values that are in each example are the default and are unrequired to be added. Except for the 'Streamer.bot Server' example.

#### Streamer.bot webstream port

To change the port to what the streamer bot is listening on, change it by search parameters in the url.

http://localhost:28080/?wsPort=8080

wsPort: Websocket port of streamer bot set in streamer bot. Default is 8080.

#### Streamer.bot Server

If streamer.bot is on a different server to you gaming machine use the search parameter `server`. Change the webstream port aswell if it is not on the default 8080.

http://localhost:28080/?server=192.168.0.10

#### Join Command

To change the join command from fight use the search parameter `joinCommand`. There is no issue if you want to use and exclamation command (!join) or not.

http://localhost:28080/?joinCommand=fight

#### Game Length

To change the game length from 60 seconds use the search parameter `gameLength`.

http://localhost:28080/?gameLength=60


#### Champion title and Hill name

http://localhost:28080/?championName=King&hillName=Hill

#### Probability of Sexy Thong

Probability of a thong (flip flop) being a thong (g-string) (1 in x), use `gstringProb`. Default is 10,000 i.e. 1/10,000.

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

1. [ ] Stats in the stream so far.
2. [ ] Track win records.
3. [ ] Kill messages on the top left like COD.

## Testing

To rebuid and test changes use the docker compose yaml in the testing folder. Ensure that the other container is down otherwith you will have conflicting ports.

```bash
docker compose --file ./testing/docker-compose.yaml up -d --force-recreate
```

## Videos

- https://www.youtube.com/watch?v=VzQjQVTmSwQ
- https://www.youtube.com/watch?v=NO3Vl7nApgc

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