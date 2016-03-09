var merge = require('webpack-merge');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.umd');

module.exports = merge(baseConfig, {
	output: {
		filename: 'social-likes.min.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				screw_ie8: true,
				warnings: false
			}
		})
	]
});
