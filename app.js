const express = require('express');
const cors = require('cors');
const discord = require('discord.js');
const dotenv = require('dotenv');
const msChannels = require('./channelList');
const cron = require('node-cron');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log('server started!'));

const client = new discord.Client();
client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
	console.log('Logged in as ' + client.user.username);
	console.log('------');
	// client.user.setActivity('আর কত!!!', { type: 'CUSTOM_STATUS' });
	scheduleJobs();
});

client.on('message', (msg) => {
	console.log(msg.content, msg.guild.id);
	if (msg.guild.id !== process.env.GUILD_ID) return;

	if (msg.content === 'yo') msg.reply('kukhur!');
	else if (msg.content.includes('biye') && msg.author.id != client.user.id)
		msg.reply('ভাই বিয়ের কথা বলে আর পেরা দিস না তো :rage:');
	else if (msg.content === 'test_all_ch') {
		let availableChannels = getChannels();
		availableChannels.map((channel) => {
			if (channel.name === 'bot-testing')
				sendMessage(
					channel.id,
					'hello world! I am a bot programmed to give reminder of your classes prior to 15 minutes of the class!'
				);
		});
	}
});

const getChannels = () => {
	let guild = client.guilds.cache
		.array()
		.filter((guild) => guild.id === process.env.GUILD_ID);

	if (!guild || guild.length === 0) return [];

	guild = guild[0];

	let channelDetails = [];
	let channels = guild.channels.cache.array();

	for (const channel of channels) {
		channelDetails.push({
			id: channel.id,
			name: channel.name,
		});
	}

	return channelDetails;
};

const sendMessage = (channelId, message) => {
	try {
		client.channels.cache.get(channelId).send(message);
	} catch (err) {
		console.log('error in sending reminder: ' + err);
	}
};

const sendReminder = (channelId, link) => {
	let msg =
		"a gentle reminder! you have class starting in the next 10 minutes unless it's been rescheduled :stuck_out_tongue: Here's the link,\n\n" +
		link;
	sendMessage(channelId, msg);
};

const scheduleJobs = () => {
	let availableChannels = getChannels();
	msChannels.map((channel) => {
		let time = `${channel.minute} ${channel.hour - 6} * * ${channel.day}`;
		let channelDetails = availableChannels.find(
			(c) =>
				c.name &&
				channel.name &&
				c.name.toLowerCase() === channel.name.toLowerCase()
		);
		if (channelDetails) {
			let scheduledMessage = new cron.schedule(time, () => {
				sendReminder(channelDetails.id, channel.link);
			});

			scheduledMessage.start();
			console.log('scheduled message for', channelDetails.name);
		}
	});
};
