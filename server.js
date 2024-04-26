const express = require('express');
const app = express();

app.get('/', home).listen(3000);

function home(req, res) {
    res.send('<h1>Hello world!</h1>')
}
