const mongoose = require('mongoose');


const express = require('express');
const postRoute = require('./routes/post.route')
// const editPostCaption = require('./routes/post.route');
// const getPostById = require('./routes/post.route');



const app = express();
app.use(express.json())

app.use('/post', postRoute )
// app.use('/:id', editPostCaption )
// app.use('/:id', getPostById )

mongoose.connect('mongodb://localhost:27017/gram')
 .then(()=> console.log('connected to mongodb'))
 .catch((err) => console.log(err))


const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening to port at ${port}...`))