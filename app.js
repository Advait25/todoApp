var express = require('express');
const bodyParser = require('body-parser');
var todoController = require('./controllers/todolistcontroller');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

app.use(bodyParser.json()); 

//set up static files
app.use(express.static('./public'));

//fire controller
todoController(app);

app.use(function(err, req, res, next){
    //console.log(err);
    res.status(403).send({error: err.message});
});


//listen to port
app.listen(3000);
console.log('listening to port 3000....');

