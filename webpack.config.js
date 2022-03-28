const path = require('path');

module.exports = {
	entry: {
		unleashTheGeek: './unleashTheGeek/main.js',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
	},
	mode: 'none',
	devtool: 'source-map',
};
