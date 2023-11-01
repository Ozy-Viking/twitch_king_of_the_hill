# Twitch King of the Hill

![GitHub tag (with filter)](https://img.shields.io/github/v/tag/ozy-viking/twitch_king_of_the_hill?logo=github&label=Latest%20Tag)![Docker Image Version (tag latest semver)](https://img.shields.io/docker/v/ozyviking/twitch-king-of-the-hill/stable?logo=docker&label=Stable%20Version&color=blue)![Docker Image Version (tag latest semver)](https://img.shields.io/docker/v/ozyviking/twitch-king-of-the-hill/latest?logo=docker&label=Latest%20Version&color=blue)

King of the Hill game for Twitch Streams to engage their audience.

A live example or a stable version you can use in production/live: [https://ozy-viking.github.io/twitch_king_of_the_hill/](https://ozy-viking.github.io/twitch_king_of_the_hill/). It can be modified to your liking using the url modification below.

## NEW

A new StartFight to relace the old one. Also added, 'End of Stream Cleanup' event which triggers when OBS stopped streaming. This should only happen when the OBS stop stream button is pressed. This is to set the source for king of the hill to 'about:blank'. This is re1uired as this change update, the JavaScript is controlling the length of the game via the parameter 'gameLength=60'. This removed the need to ensure this timed is changed in multiple spots.

```base64
U0JBRR+LCAAAAAAABADdWNtu3DYQfS/Qf1C3cJ/CDe+iDARF6tZN0DYFktYvRVDwMtpVo8tWouy4gf+9lLRrryxt4hgOkHafVjPDIXmGc3ikd19+EUWLc6ibrCoXxxF71BuyYlPV/uzaTAdzkZVZ0RY39gVe0iVZbL3gdbC96x7CY6kL6EJewEX0yuvaR6fZau2H4ODXrV9XdRfx6z+Xf55lb7Jyde08359CLAlBtd1NFNwOGltnG78NeQmbXFuILqu2jpp+rrSbK7rI/Dry66yJqhKW0aIbfjWs1unRarXtkjXB8sdgiXau3p25bh6BNcOCaWSVlIhLx1DiYooApLaKy9Qyu1tjP+zvFtoOhLLN8307lNrk0OX0dQsjz1ubtw5O66p4ljW+qi9DUKrzZhS1w/aH0kVVGuCtQRfRSQ66bDejFazqKlhC6Miq8wt92bxsy7nktS5dVTy1W3QnfluVtq1rKP2c19fZahWqt4/kLTT3EOWKOcWFRFQYgjhjFCUpJAgIZzEkClNM91c+THG56XZPhLjtOYjrZNedf999dfPweoTU9FzM7aaxUMKLbVVetaaJAojRm8qvJ6tvwiG117E/hVPfldCvIXqW5fkkvK3zLk6bqvXHJtflm0lIKEgJ/Tqf96AyzAyJlUGxjQ3ihkqkhIuRxXGiEkJil9hJkqEeicUydowh53ga6mEp0kwmiLJYKJBUO0YmQy+gb+zjCC/xgVoxdduxO5i3WuMOZcxKB2+72Ub1e/S+8pzrvO/DxZmus/QyynzUc0J+GV2soYygdE3ooaKzbmpoGnDLGZjzga++Pj3F4XcAQkGkFsIAoglXiCtrwpGmHLFw0kFbI2Ih7wMhwTh5eBDJ3Zvgx26yvhNej+kgz/UmILbn37lvqjIl01hjFyDRSAQSQJxjjnSckHBKwXJsXJxiMUumi0TohAuVoFgxgXgCJCDMHRIqxYxLSlw6Ks6D0W1/jY1usVEV3tvMnwPn2qoowkQDSzggFkQcWp0zHFo9Vigx2qBUcqqZZgrEoSNORSIVxQI5rCnimhtkYswQw9pgakVKqTnE2hyT+7N2v/P/Em2vvd8cP35MkiCTpFqSJcHkmCqs8ONvPTQ+pPlmFXL+DOXKr58c3fw/Omj/q8rKk6GST476h1++P/qUlwIRjHISYyRTE/otDtpHQWhXSGOswnXNbPLZXAr8Yy6FOutS7mp6g/FkM7v7g0+2ElRs9duwndll9QBqLYAIqUKrmUB1hBik0lAAmzKdcmlwauJ7XQmUPTyC9O4I/m9UD2GM8BhQAjLUB0J9tJUx4qkicSqoolY/7AFfTNJ9Ms0TdMPtbIV+e7b1TnzDTTRzy+zhJVNHmZMB6oBs4H+RoITZGCmpuHKJBCHdPSUOfWjEyMcgNiaELbceZIPF/ivrtfdOjGA4j4kKlOqwDO89lqYoUcwgQnCQQyAYAfXAjHBfANmnVYjDn138IPI+8Br+0frP5JXtazUVgDtpN6i6Q6vaCqeD6xrYbSI38AG0NlAXmffgfm9mVNuCSIklw5QvPjT+AODZvQTeNRZf9Z9QDijoifjMyl5Cz2BbVO42xeyQPDBNqJPeSuDRqGxVVjV8V/mn1lbtvAgeYp6XHupS53MRm+6jUuNPugxQz8vsnQvPDOyq9Z7B7Y27K8m7q1Fm3cArKJvMZ+cwN3qVV0bnJ1WVu+piAsCQ+9pHRiNnP/GsApH7LQ/hQ+faZ8X2APYNGdxX/wJV5h/PEhQAAA==
```

## Docker Container

Docker image: [ozyviking/twitch-king-of-the-hill](https://hub.docker.com/repository/docker/ozyviking/twitch-king-of-the-hill/)

### Images

- Stable: Built of tagged pushes that are either a patch, minor or major semver bump.
- Latest: More bleading edge / higher chance of bugs. Built off every push to github.
- Branch: Built off the lastest push in that branch.
- Tags: Built off tagged pushes ('v0.1.1').

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

### Resource Limiter

These values within the docker compose file are used to limit the resouces available. If the container isn't responding due to lag, I would suspent from large amount of traffic, try increasing either or both limits (or removing them for not limit).

```yaml
services:
  web:
    ...
    deploy:
      resources:
        limits:
          cpus: "2"
          memory: 2gb
    ...
```

## URLs

Currently there are:

- [King of the hill](https://github.com/Ozy-Viking/twitch_king_of_the_hill#king-of-the-hill)
- [Subs](https://github.com/Ozy-Viking/twitch_king_of_the_hill#stream-subs)
- [Counter](https://github.com/Ozy-Viking/twitch_king_of_the_hill#counter)

### King of the hill

King of the hill (KOTH)

```url
http://localhost:28080/
```

#### KOTH Streamer.bot Commands

Commands, events and queues to import into streamer.bot.

```base64
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
```

#### Modifications

To have multiple modifications, simply use an `&` between terms.

```url
http://localhost:28080/?wsPort=8080&gameLength=60
```

The values that are in each example are the default and are unrequired to be added. Except for the 'Streamer.bot Server' example.

##### Streamer.bot webstream port

To change the port to what the streamer bot is listening on, change it by search parameters in the url.

```url
http://localhost:28080/?wsPort=8080
```

wsPort: Websocket port of streamer bot set in streamer bot. Default is 8080.

##### Streamer.bot Server

If streamer.bot is on a different server to you gaming machine use the search parameter `server`. Change the webstream port aswell if it is not on the default 8080.

```url
http://localhost:28080/?server=192.168.0.10
```

##### Join Command

To change the join command from fight use the search parameter `joinCommand`. There is no issue if you want to use and exclamation command (!join) or not.

```url
http://localhost:28080/?joinCommand=fight
```

##### Game Length

To change the game length from 60 seconds use the search parameter `gameLength`.

```url
http://localhost:28080/?gameLength=60
```

##### Champion title and Hill name

```url
http://localhost:28080/?championName=King&hillName=Hill
```

##### Probability of Sexy Thong

Probability of a thong (flip flop) being a thong (g-string) (1 in x), use `gstringProb`. Default is 1,000 i.e. 1/1,000.

```url
http://localhost:28080/?gstringProb=1000
```

##### Additional Rigged Users

If you want to add an additional rigged user use the search parametre `riggedUser`. You can add as many as you would like.

```url
http://localhost:28080/?riggedUser=Ozy_Viking&riggedUser=Not_Ozy_Viking
```

##### Testing Setup

If you want a bunch of random players to jump in for testing, use `testing=true`.

```url
http://localhost:28080/?testing=true
```

or

```url
http://localhost:28080/?testing
```

##### Show Last Winner

By default the last winner will be displayed, to not show them use the search parametre `lastWinner`.

```url
http://localhost:28080/?lastWinner=no
http://localhost:28080/?lastWinner=false
```

##### Message Win Streaks

By default the win streaks will be sent through to twich chate, to not have them use the search parametre `winStreak`. Curently every 3 wins.

```url
http://localhost:28080/?winStreak=no
http://localhost:28080/?winStreak=false
```

##### Reset Winner History

To reset/clear the win history use the search parametre `reset`.

```url
http://localhost:28080/?reset
http://localhost:28080/?reset=true
```

To not reset either don't add it or equal it to either `false` or `no`.

```url
http://localhost:28080/?reset=false
http://localhost:28080/?reset=no
```

#### Weapon Calls

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

> If you want to flip/invert the image, use `scaleX(-1)`.

Use:

```text
{joinCommand} with an amazing FOrmaL ThoNG
```

Caps does not matter for the user.

For Doughnut, both american and british spelling were added. I highly recommend doing so for any other ambiguities.

#### Ideas

1. [x] Stats in the stream so far.
1. [ ] Track win records.
1. [ ] Kill messages on the top left like COD.
1. [x] Stop sound at appropriate places.
1. [x] Work on sound timings and effects.
1. [x] Variable Time
1. [x] Ad warning not working
1. [x] Last winner name on hill
1. [x] Fix teapot lefts
1. [x] Add version to title.
1. [ ] Make some weapons throwable.

#### Known Bugs

1. [x] What bugs, please let me know by raising an issue.
2. [x] Limited to 60 seconds.

#### Videos

- https://www.youtube.com/watch?v=VzQjQVTmSwQ
- https://www.youtube.com/watch?v=NO3Vl7nApgc

#### Acknowlegements

Inspired as a birthday gift for Ostrogothia (https://twitch.tv/Ostrogothia).
Original author is VRFlad: [Champion of the Hill](https://vrflad.com/champion)

#### Pictures

Special thanks to @the_rubble for designing the new imagery!!! The rest are from vrflad's orginal game.

#### Sound

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

---

### Stream Subs

```url
http://localhost:28080/subs
```

#### OBS Setting

Browser:

- Width: 400
- Height: 100

#### Streambot import function

```text
U0JBRR+LCAAAAAAABADNV9uO2zYQfS/Qf3ANpE/hgqQuJPOWprctsm2xafalKApeRl4hurgUtZcu9t9LSpZtWXLgbpMm+7TmGc6Q58wMRw9ffrFYLG/ANnldLV8soufdQl6ua+uutsu0Xy7zKi/bcre+xGf0jCw3KDjp1x7CD/+zkiUEk4v7xXd3wV1v5hHZuuvaBuyXv+//vMrf5dVqC+7OsiRneHDuAQONtvnabcBlWH7sIxs5iix1MGr8yu/9ymKAOjg3Yb+giqsMM2RMEqM4jiSSmlIksWQYR0JLrobY3ba/WmjDhaq2KPbXoZKqgODT2RZGyJ0uWgPf27r8MW9cbe+9USaLZmQ18HQJDbjFm1aFayqwC123lRsdYWXrdh1sd1Y/fTuykMWtvG8u22oukpWVqcuXekPhBNd1pVtrwUedQZ3NVysvzj6tB9RuvJSlD3TesZwqakyaGsQFTlCMARCngqNEGJpiTzGXcv8CewJxGnFCRIpoFAQyLENCiQRhRhkFoVSWTLe6+3UgM8bkEDkq0zxv+/jj7scfI7KneTZHSKOhgp83KgflFp6exbvaXU+O39St1SPbiUlri4A9azz49vL1s69tyJuJmdeygu58vRARjhRhXCGmmUKxoiniiWFIYya4IIQZoY8IYUycZQQbFDNfLjGOCeJAY5Qwg8FglsgIJltvIV9dhzzCZ/iISBE/BIb8PiixE/TLKwN3HiMj3Z5/Olk+qiAs4gkTGEUkARRzghFPsUbMKKYzLjiPk89FkOh0QW5k0TVYQpNDb6W8u9qgk8P3XW2mY+0xRjSRkkiBsASfwpoAUhGWviuJmOmYZ1LipzBGMKYfnjN6OmcO7tz28XixOJ5+awsZ+N5uXur+XZlhsudKsySGJFFI+T8UQ0RD8yaeMEIikyaZzujTuPrwTMX/oty7Gp679o20eQg21PeGwymFYTJp3NFD+QHF5ZUMJX61cfk+dwYy2RZuyOs5EnpBMs4zjplGKWGh/1KvhYgzFEdcKkOpiPT0ITxFEDp5JLcDxsTfaXrg05/NH0Ko7u0cgbouCrluwOzhA7wTeDrORZnPTwGZ74mMoJgKg0TCuJ82Uk60wlwL+r+Oc/6VuICmkSuYH+E+xdj2lOll6DDPrLw9r9at+y+9JfK5ykxCEDHUpzLPNBJ+qEPdiMGYMsDTz6W3fORc7v8Z7Pt0HLkYBumj3zF9R5sIiI8c1bevMne+fb1t5tJhC+8Ou+91eVEbsNJn/cHss/ctcohcnf/aLI+cJn/S58G2urqh10d+FfIN7HK+gifFkFddCc8Ud1mbw8dhECDE+6oL6Fv5KFJRa7mpytHGfFXVFr6p3a4gDuP1Jufh8JUsZgw2r81wwdm6HyA8szGo/J7N7Q4OWj88jjzLBt5A1eQuv4G53auiVrJ4VdeFqW8n1+99z2Pz/W/le5z7ra9lfKxEXF4OiRtWPPz4DxULYbu/EAAA
```

Ensure you set a Persistent Global Variable called subsURL.

#### Subs Setting

In the chat use `!setsubcount 10` this will set the count to 10 or if you know the tier amounts you can use `!setsubcount 0 2 1`. Only streamer and myself can do that.

#### Subs Modifications

##### Subs Streamer.bot webstream port

To change the port to what the streamer bot is listening on, change it by search parameters in the url.

```url
http://localhost:28080/subs?wsPort=8080
```

wsPort: Websocket port of streamer bot set in streamer bot. Default is 8080.

##### Subs Streamer.bot Server

If streamer.bot is on a different server to you gaming machine use the search parameter `server`. Change the webstream port aswell if it is not on the default 8080.

```url
http://localhost:28080/subs?server=127.0.0.1
```

##### Subs Reset Count

You can either use the pre-configured command `!resetsubs` or add reset to the search parameter/s.

```url
http://localhost:28080/subs?reset
```

##### Subs Testing

This will add buttons so you can manually simulate subs and reset count.

```url
http://localhost:28080/subs?testing
```

---

### Counter

```url
http://localhost:28080/counter
```

Counter is used for counting a specific message sent through chat. It uses a check to see if the message starts with a 'count command'. For example, if the command is '!slap' then as long as the first 5 characters start with '!slap' then it will increase the count.

#### Counter Command for streamerbot

```base64
U0JBRR+LCAAAAAAABADVVtuO2zYQfQ+Qf3D9HHqpmyUGKIo0QNu8tEG23ZeiMIbkyCYiiS5FrddZ7L+X1GVtWXKxCFqgfRGgOXMhz+EM+fj61WKxvEdTK10t3y6iN61BlXtt7N2zOezMpapU2ZQn+5KuwlWw7FG04GyP/sf9VlCid/mENdrFe91U/luWUMkuwPlAY3faeK9fvhw3d+qzqrbP4GlVy2BFV/QZkFgLo/a2B5fe/NStQcJoDSC8U+0sv3eWxQC1sJI+PslZlmeQkFTEAYkzuiaZZIKkQc4TZBCxIBtqt2F/Ntj4rVVNUZzbsQJeoM9pTYMj5EEUjcQfjC5/UrXV5uiccijqkdfAmPGMtYSNym6Nbvbths+tUBzgWH9qqrmMxpGty3eip2qCC12Jxhh0lWZQa9R260Q4p++Cwj5Lq+qHlk2+zrM0SCSRnEUkTigQlsRA1hHEjmWZr8PgfANnQnAexgDrlERAKYmRSgKICYEEIaAiiHkkJqH2uPekxTS4RK7KMc/bOf50+vljRPb0PM0RUgus8OdezduG1wtHz+KztrvJ8mvdGPHs24qOZnFbwL6e+Dam8E47a/f125sb/eVI7tuWWW2V3TV8pfSNPSgrdhtv3eh8Y3e42amiuBFd5u/aszXJ7M5Bhe3eOhEjGvEgzbhriZSTmIeuJRKZEkFTlrEgSF1/XBExpJS7jgES0jB1+rOUQAiUyJzKNBZRIthU/wOq7c6fQdfmVwSOsktg6IeLNnyB9qqS+OCrjTR/8z+V9FB/dMP625DRjP6bygY5wzXmQIRIQhKv89Ap6xo1S3LOGQMnMPuvKBu+XNl7KNppHtDJAkt4uOvRCdaN1pmxecZYHodpziLXC5BkJI5YSBgNMzffMFojxIIH0dcw5pYa/vOcBS+fgD/6Yu0YHIFCF/6UozzDB7hPOPh3l+goxXCPXL2uu8aaTF96Zal7NKWyFuVvdX+JzcNXNqO+6jqbe/aM8JMWk/tWVe0rYeb9UGp5eQgHtnytb9qpLia1Ci2gv/pHoWpbaYPfa/tOdEHTip3LBz9gKihmHPb+dVbbfrzNPy4GiM4EelH+Jrg5wV6ax6dRZqjxFqtaWXWPc9HbQnMo3mtdSH2YbL/LPY/NP7K2rtvtr13z0Wsn2qpyOGfti/T1q6e/AJ6d18pfCwAA
```

#### Counter Setting

In the chat use `!setcount 10` this will set the count to 10. Only streamer and myself can do that.

#### Counter Modifications

##### Counter Streamer.bot webstream port

To change the port to what the streamer bot is listening on, change it by search parameters in the URL.

```url
http://localhost:28080/counter?wsPort=8080
```

wsPort: Websocket port of streamer bot set in streamer bot. Default is 8080.

##### Counter Streamer.bot Server

If streamer.bot is on a different server to you gaming machine use the search parameter `server`. Change the webstream port as well if it is not on the default 8080.

```url
http://localhost:28080/counter?server=127.0.0.1
```

##### Counter Reset Count

You can either use the preconfigured command `!resetcount or add reset to the search parameter/s.

```url
http://localhost:28080/counter?reset
```

##### Counter Testing

This will add buttons so you can manually simulate the command and reset the count.

```url
http://localhost:28080/counter?testing
```

You can also add optional text to test as a message.

```url
http://localhost:28080/counter?testing=random text to test
```

##### Count Command

To change the count command from !slap use the search parameter `count`. There is no issue if you want to use and exclamation command (!slap) or not. The command is also, case insensative i.e. `!SLaPYA` is valid as it starts with !slap.

```url
http://localhost:28080/counter?count=!slap
```

##### Count Text

To change the text preceding the count use `counter_text`. There is a space between the counter text and the count but add and punctuation marks as needed. `Incoming Sassy Slaps:` is the default but also a valid input.

```url
http://localhost:28080/counter?counter_text=Incoming Sassy Slaps:
```

##### Count Timeout

To stop over spamming or helping prevent multiple people using the command for the same instance use the search parameter `timeout`. If no timeout is given, all inputs are counted. Only use numbers of seconds. For a 10 second timeout, `timeout=10` would be used. If `timeout=10sec` is used then the timeout will be 0.

```url
http://localhost:28080/counter?timeout=0
```

## Testing

To rebuid and test changes use the docker compose yaml in the testing folder. Ensure that the other container is down otherwith you will have conflicting ports.

```bash
docker compose --file ./testing/docker-compose.yaml up -d --force-recreate
```
