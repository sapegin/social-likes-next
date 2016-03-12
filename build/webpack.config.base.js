var path = require('path');
var webpack = require('webpack');
var version = require('../package.json').version;

module.exports = {
	_banner: 'Social Likes Next v' + version + ' by Artem Sapegin - https://github.com/sapegin/social-likes-next - MIT License',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				include: path.resolve('src'),
			},
		],
	},
	entry: [
		'./src/index.js',
	],
	output: {
		path: path.resolve('lib'),
		library: 'SocialLikesNext',
		libraryTarget: 'umd',
	},
	resolve: {
		extensions: ['', '.js'],
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
	],
};
