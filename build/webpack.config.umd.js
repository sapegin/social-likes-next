var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var BannerPlugin = require('webpack/lib/BannerPlugin');
var baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
	output: {
		path: path.resolve('dist'),
		filename: 'social-likes.js',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new BannerPlugin(baseConfig._banner),
	],
});
