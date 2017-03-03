/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

module.exports = {

    output: {
        filename: 'main.js',
        publicPath: '/assets/'
    },

    cache: true,
    debug: true,
    devtool: 'sourcemap',
    entry: [
        'webpack/hot/only-dev-server',
        './src/components/GallerByReactApp.js'
    ],

    stats: {
        colors: true, //控制台打印的东西是有颜色分别的
        reasons: true
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'styles': __dirname + '/src/styles',
            'mixins': __dirname + '/src/mixins',
            'components': __dirname + '/src/components/'
        }
    },
    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }],
        loaders: [{ //为什么我们能直接在css里面能够require图片文件，js文件呢？就是loader在起作用，相当于grunt这种build工具中的task
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel-loader' //react-hot把react实时编译的loader,babel-loader是把es6转化成javascript
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!autoprefixer-loader?{browsers: ["last 2 version"]}!sass-loader?outputStyle=expanded'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

};
