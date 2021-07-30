const dotenv = require('dotenv');
dotenv.config();

const msChannels = [
	{
		name: 'bioinformatics-algorithms',
		link: process.env.BIOINFORMATICS_ALGORITHMS,
		day: 'Sunday',
		hour: '16',
		minute: '45',
	},

	{
		name: 'semantic-web',
		link: process.env.SEMANTIC_WEB,
		day: 'Wednesday',
		hour: '16',
		minute: '45',
	},

	{
		name: 'network-science',
		link: process.env.NETWORK_SCIENCE,
		day: 'Saturday',
		hour: '9',
		minute: '45',
	},

	{
		name: 'neural-networks',
		link: process.env.NEURAL_NETWORKS,
		day: 'Saturday',
		hour: '16',
		minute: '45',
	},

	{
		name: 'software-project-management',
		link: process.env.SOFTWARE_PROJECT_MANAGEMENT,
		day: 'Sunday',
		hour: '16',
		minute: '45',
	},

	{
		name: 'high-dimensional-data-management',
		link: process.env.HIGH_DIMENSIONAL_DATA_MANAGEMENT,
		day: 'Monday',
		hour: '16',
		minute: '45',
	},

	{
		name: 'data-mining',
		link: process.env.DATA_MINING,
		day: 'Tuesday',
		hour: '16',
		minute: '45',
	},

	{
		name: 'network-security',
		link: process.env.NETWORK_SECURITY,
		day: 'Monday',
		hour: '16',
		minute: '45',
	},

	{
		name: 'fts',
		link: process.env.FTS,
		day: 'Monday',
		hour: '16',
		minute: '45',
	},

	{
		name: 'software-qa',
		link: process.env.SOFTWARE_QA,
		day: 'Sunday',
		hour: '16',
		minute: '45',
	},

	{
		name: 'distributed-computing-systems',
		link: process.env.DISTRIBUTED_COMPUTING_SYSTEMS,
		day: 'Wednesday',
		hour: '16',
		minute: '45',
	},

	{
		name: 'advanced-algorithms',
		link: process.env.ADVANCED_ALGORITHMS,
		day: 'Tuesday',
		hour: '16',
		minute: '45',
	},
];

module.exports = msChannels;
