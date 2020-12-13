module.exports = {
	options: {
		useNewUrlParser: true,
		autoIndex: false, // Don't build indexes
		reconnectTries: 100, // Never stop trying to reconnect
		reconnectInterval: 500, // Reconnect every 500ms
		poolSize: 10, // Maintain up to 10 socket connections
		// If not connected, return errors immediately rather than waiting for reconnect
		bufferMaxEntries: 0
	},
	mongoURI: 'mongodb://alex:1a2b3c@ds046027.mlab.com:46027/fullstack',
	jwt: 'dev-jwt'
};