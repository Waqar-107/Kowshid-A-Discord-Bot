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
	else if (msg.content === '107') {
		sendReminder();
	}
});

function getChannels() {
	let channelDetails = [];

	try {
		let channels = client.channels.cache.array();
		for (const channel of channels) {
			channelDetails.push({
				id: channel.id,
				name: channel.name,
			});
		}
	} catch (err) {
		console.log('error getting channels: ' + err);
	}

	return channelDetails;
}

function sendReminder() {
	let channels = getChannels();
	let available = ['subject-1', 'subject-2'];

	for (let channel of channels) {
		if (available.indexOf(channel.name) > -1) {
			try {
				client.channels.cache.get(channel.id).send('hello kukhur');
			} catch (err) {
				console.log('error in sending reminder: ' + err);
			}
		}
	}
}
