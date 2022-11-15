const mongoose = require('mongoose');


const express = require('express');


const app = express();
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/gram')
 .then(()=> console.log('connected to mongodb'))
 .catch((err) => console.log(err))


const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening to port at ${port}...`))