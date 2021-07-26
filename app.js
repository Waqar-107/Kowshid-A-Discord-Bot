const discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new discord.Client();
client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
	console.log('Logged in as ' + client.user.username);
	console.log('------');
});

client.on('message', (msg) => {
	if (msg.content === 'yo') msg.reply('kukhur!');
	else if (msg.content.includes('biye') && msg.author.id != client.user.id)
		msg.reply('vai, biyer kotha bole pera dish na toh');
});
