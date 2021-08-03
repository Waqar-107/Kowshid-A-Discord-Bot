# Kowshid - a bot for your Discord server!

`Kowshid` is a bot that can send message to the defined text-channels of of a discord server.

# Motivation

As there's a pandemic ongoing and we are having our M.Sc. classes online, we required something that will remind that we have classes with the appropriate links. So, I implemented this bot that sends message at the course channels at the scheduled time that is 15 mintues prior to the start of the class.

# How I Approached

- The bot is basically a `Node.js` server.
- A list of objects has been defined where the each object represents a course. They have time, class links, name etc.
- The `guildId` of the discord server has been provided. The channel list can be fetched using this.
- `discord.js` has been used to connect to the server.
- Once connected, the `ready` event is fired where we schedule to send messages in the defined text channels using [Cron](https://www.npmjs.com/package/node-cron).
- The bot has been deployed to [repl.it](https://repl.it/)
