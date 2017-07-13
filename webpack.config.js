var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'client/index.js'),
    output: {
        path: path.resolve(__dirname, 'build/assets'),
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build/'),
        port: 3000,
        inline: true,
        hot: true
    }
};
