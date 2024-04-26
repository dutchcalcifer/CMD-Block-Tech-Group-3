let express = require('express'),
    path = require('path'),
    app = express();

app
.set('view engine', 'ejs')
.set('views')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.listen(3000);
