const mongoose = require('mongoose');
require('dotenv').config()

const express = require('express');
const postRoute = require('./routes/post.route');
const profileRoute = require('./routes/profile.route');
const connectionRoute = require('./routes/connection.route');
const cors = require('cors')


const app = express();
app.use(express.json());

app.use(cors())

app.use('/post', postRoute );
app.use('/profile', profileRoute);
app.use('/connection', connectionRoute);


mongoose.connect('mongodb://localhost:27017/gram')
 .then(()=> console.log('connected to mongodb'))
 .catch((err) => console.log(err))


const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening to port at ${port}...`))