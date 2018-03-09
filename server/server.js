import express from 'express';
import path from 'path';

let app = express();

app.use(express.static(path.join(__dirname, '../src'), {
    maxAge: 30 * 60 * 60 * 24 * 1000
}));

app.get('*', function (req, res) {
    res.sendFile(__dirname + 'index.html');
});


app.listen(3000, () => console.log("express server is running on 3000"));