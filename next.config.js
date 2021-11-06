const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	webpack(config) {
		config.resolve.alias['src'] = path.join(__dirname, './src');

		return config;
	}
}
