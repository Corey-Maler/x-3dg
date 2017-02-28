const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].js',
        libraryTarget: 'umd',
        publicPath: '/',
    },

    module: {
        rules: [{
            test: /\.tsx?/,
            loader: 'awesome-typescript-loader'
        },
        ]
    },

    entry: {
        engine: path.resolve(__dirname, './src/index.ts'),
        /*vendor: [
           // "three",
            //"webpack-dev-server/client?http://localhost:3000",
            //"webpack/hot/dev-server"
        ]
        */
    },

    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
    },

    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    devtool: 'inline-source-map',
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './examples/index.html'),
        }),
    ]
}