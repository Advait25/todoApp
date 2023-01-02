var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connnect to a database
mongoose.connect('mongodb://db:27017/TodoList');


//create schema
var todoSchema = new mongoose.Schema({
    Item: String
});

//create model type
var Todo = mongoose.model('todos', todoSchema);

// var itenOne = Todo({Item: 'Sleep for 2 hours'}).save(function(err){
//     if (err) throw err;
//     else console.log('Item Saved');
// })

var urlencodedParser = bodyParser.urlencoded({extended: false});

// var todoItems=[{item: 'get groceries'},{item: 'clean room'}, {item: 'codeeeeeeee'}];

module.exports = function(app){

    app.get('/todo', function(req, res, next){
        //get data from mongodb database and pass it to the view
        Todo.find({}).then(function(data){
           res.render('todo', {todos: data});
        }).catch(next);
        // res.render('todo', {data: todoItems});
        
    });

    app.post('/todo', urlencodedParser, function(req, res, next){
        //get data from view and add it to the mongodb
        var newTodo = new Todo({
            Item: req.body.item
        })

        newTodo.save(req.body).then(function(data){
            res.json(data);
        }).catch(next);

        // todoItems.push(req.body);
        // res.json(todoItems);
    });

    app.delete('/todo/:item', function(req, res){
        //delete particular todo Item from the mongodb

        Todo.find({Item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw error;
            else res.json(data);
        })

        // todoItems = todoItems.filter(function(listItem){
        //     return listItem.item.replace(/ /g, '-') !==req.params.item;
        // });
        // res.json(todoItems);
    });

}