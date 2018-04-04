import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import users from './routes/users';
import auth from './routes/auth';

let app = express();

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);

var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');
var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static(path.join(__dirname, '../src'), {
    maxAge: 30 * 60 * 60 * 24 * 1000
}));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});


app.listen(3000, () => console.log("express server is running on 3000"));