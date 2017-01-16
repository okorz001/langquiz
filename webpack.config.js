'use strict'

const webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: './client/index.js',
    output: {
        path: './build',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', {modules: false}],
                        'react',
                    ],
                },
            },
        ],
    },
    /*
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: true,
            mangle: true,
        }),
    ],
    */
}
