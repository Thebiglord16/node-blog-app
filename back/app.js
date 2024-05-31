const express = require('express');
const postRouter = require('./routes/posts');
const userRouter = require('./routes/users');
const commentRouter = require('./routes/comments');

let app = express();


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use(express.json())

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

app.listen(3000, function (){
    console.log('Server started on port 3000!');
});