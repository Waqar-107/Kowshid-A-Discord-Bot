const dotenv = require('dotenv');
dotenv.config();

const msChannels = [
	{
		name: 'subject-1',
		link: process.env.DUMMY_LINK,
		day: 'Tuesday',
		hour: '2',
		minute: '30',
	},

	{
		name: 'subject-2',
		link: process.env.DUMMY_LINK,
		day: 'Tuesday',
		hour: '2',
		minute: '31',
	},

	// {
	// 	name: 'bioinformatics-algorithms',
	// 	link: process.env.BIOINFORMATICS_ALGORITHMS,
	// },
];

module.exports = msChannels;
