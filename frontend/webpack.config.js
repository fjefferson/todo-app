const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: 'app.js'
    },
    devServer: {
        port: 8080,
        contentBase: './public'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    plugins: [new ExtractText('app.css')],
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