# Redis with TypeScript

This is a redis implementation in TypeScript to [CodeCrafters Challenge](https://app.codecrafters.io/courses/redis).

## Summary
- [System Requirements](#system-requirements)
- [Running the server](#running-the-server)
- [Running commands](#running-commands)
- [Current Commands](#current-commands)
- [Author](#author)

## System Requirements
- [node](https://nodejs.org/en/download/package-manager)
- [bun](https://bun.sh/docs/installation)
- [redis-cli](https://redis.io/docs/latest/operate/rs/references/cli-utilities/redis-cli/) (optional)

## Running the server
```bash
./spawn_redis_server.sh --port <PORT> --replicaof "<MASTER_HOST> <MASTER_PORT>"
```

obs: args are optional

## Running commands
```
redis-cli <command> <...args>
```

## Current Commands

| Command | Arguments     | Description                                     |
|---------|---------------|-------------------------------------------------|
| ping    | -             | Responds with "PONG" to check connectivity.     |
| echo    | message       | Echoes the provided message back to the client. |
| set     | key<br/>value | Set the string value of a key                   |
| get     | key           | Get a string from a key                         |
| info    | server        | Get info about the current server               |


## Author
- Otávio Gonçalves - otavio18gl@gmail.com