var express = require('express');
var todoContoroller = require('./controllers/todoContoroller')
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
todoContoroller(app);
app.listen(3000);
console.log('you are listening to port 3000');