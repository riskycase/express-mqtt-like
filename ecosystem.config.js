module.exports = {
	apps: [
		{
			name: 'MQTT Mock',
			script: 'dist/index.js',
			env: {
				PORT: '3905',
			},
		},
	],
};
