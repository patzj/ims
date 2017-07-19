var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: path.resolve(__dirname, 'server/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'server.js'
    },
    target: 'node',
    node: {
        fs: "empty"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-2']
                }
            }
        ]
    },
    externals: [new nodeExternals()]
};
