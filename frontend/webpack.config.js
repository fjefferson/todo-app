const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './js/app.js'
    },
    devServer: {
        port: 8090,
        contentBase: './public'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    plugins: [new ExtractText('css/app.css')],
    module: {
        loaders: [{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-object-rest-spread']
            }
        },{
            test: /.css$/,
            loader: ExtractText.extract({fallback: 'style-loader', use: 'css-loader'})
        },{
            test: /\.woff|.woof2|.ttf|.eot|.svg*.*$/,
            loader: 'file-loader'
        }]
    }
}