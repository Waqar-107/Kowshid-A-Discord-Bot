const discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new discord.Client();
client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
	console.log('Logged in as ' + client.user.username);
	console.log('------');
});
