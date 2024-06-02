const express = require('express');
const postRouter =  require('./routes/posts');
const userRouter = require('./routes/users');
const commentRouter = require('./routes/comments');
const cors = require('cors');

require('dotenv').config()

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

app.listen(3000, function (){
    console.log('Server started on port 3000!');
});