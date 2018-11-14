var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:jaie937@ds041218.mlab.com:41218/rk-db', {useNewUrlParser: true});

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: '宿題をする'}, {item: 'ペットに餌をやる'}, {item: '寝る'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/todo', function(req,res){
        Todo.find({}, function(err,data){
            if(err) throw err;
            res.render('todo',{todos: data});
        });
        
    });
    app.post('/todo', urlencodedParser, function(req,res){
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:item', function(req,res){
        Todo.find({item: req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
};

