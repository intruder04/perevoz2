import express from 'express';
import path from 'path';

let app = express();
app.get('/*', (req, res) => {
    // res.send('he');
    console.log(path.join(__dirname, '../src/index.html'));
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(3000, () => console.log("express server is running on 3000"));