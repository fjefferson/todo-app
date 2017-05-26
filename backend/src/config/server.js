const bodyParser = require('body-parser');
const express = require('express');
const server = express();

const port = 8080;

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.listen(port, () => {
    console.log(`BACKEND is running on port ${port}.`);
});