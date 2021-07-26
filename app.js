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
	scheduleJobs();
});

client.on('message', (msg) => {
	if (msg.content === 'yo') msg.reply('kukhur! eta heroku theke reply btw');
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

const sendReminder = (channelId, link) => {
	try {
		client.channels.cache
			.get(channelId)
			.send(
				"a gentle reminder! you have class starting in the next 10 minutes unless it's been rescheduled :stuck_out_tongue: Here's the link,\n\n" +
					link
			);
	} catch (err) {
		console.log('error in sending reminder: ' + err);
	}
};

// second minute hour day_of_month month day_of_week
// * minute hour * * day_of_week
// schedule job for all the available subjects
const scheduleJobs = () => {
	let availableChannels = getChannels();
	msChannels.map((channel) => {
		let time = `${channel.minute} ${channel.hour} * * ${channel.day}`;
		let channelDetails = availableChannels.find((c) => c.name === channel.name);
		if (channelDetails) {
			let scheduledMessage = new cron.schedule(
				time,
				() => {
					sendReminder(channelDetails.id, channel.link);
				},
				{
					timeZone: 'Asia/Dhaka',
				}
			);

			scheduledMessage.start();
			console.log('scheduled message for', channelDetails.name);
		}
	});
};
