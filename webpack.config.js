var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './src',
        port: 3000
    },
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client', './client/js/index.js'
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel-loader"],
                include: path.join(__dirname, 'client'),
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    output: {
        path : path.join(__dirname, 'src/js'),
        filename : 'bundle.min.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        
    ],
    // node : {
    //     fs: 'empty',
    //     net: 'empty'
    // }
};
