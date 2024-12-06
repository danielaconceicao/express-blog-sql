const express = require('express');
const app = express();
const postsRouter = require('../express-blog-api-crud/router/posts');
const notFoundMiddleware = require('./middleware/notfound');
const handleMiddleware = require('./middleware/serverError');
const cors = require('cors')
const HOST = 'http://localhost'
const PORT = 3001

app.use(express.static('public'))

app.use(cors())

app.use(express.json());

app.listen(PORT, () => {
    console.log(`${HOST}:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('')
});

app.use('/posts', postsRouter);

app.use(notFoundMiddleware);

app.use(handleMiddleware);
  