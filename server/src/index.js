import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import users from './routes/users';
import auth from './routes/auth';
import events from './routes/events';

let app = express();

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../src/index.html'));
// });


app.listen(8080, () => console.log("express server is running on 8080"));