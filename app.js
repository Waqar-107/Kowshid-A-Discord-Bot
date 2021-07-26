const discord = require('discord.js');
const dotenv = require('dotenv');
const msChannels = require('./channelList');

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

const getChannels = () => {
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
};

const sendReminder = () => {
	let channels = getChannels();

	for (let channel of channels) {
		let idx = msChannels.findIndex((c) => c.name === channel.name);
		if (idx > -1) {
			try {
				client.channels.cache
					.get(channel.id)
					.send(
						"a gentle reminder! you have class starting in the next 10 minutes! Here's the link\n\n" +
							msChannels[idx].link
					);
			} catch (err) {
				console.log('error in sending reminder: ' + err);
			}
		}
	}
};
