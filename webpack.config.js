const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/script.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: __dirname + 'node_modules',
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [new HTMLWebpackPlugin()],
    mode: 'production',
};
