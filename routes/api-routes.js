const db = require("../models");

module.exports = function(app){
    
    app.get('/api/list', function(req, res){
        db.Todolist.find({})
            .then(function(data){
                res.json(data)
            })
            .catch(function(err){
                console.log(err);
            })
    });

    app.post('/api/list', function(req, res){
        db.Todolist.create(req.body)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.json(err);
            })
        
    });

    app.get('/api/list/:id', function(req, res){
        let chosen = req.params.id;
        db.Todolist.find({"_id":chosen})
        .then(function(data){
            res.json(data)
        })
        .catch(function(err){
            console.log(err);
        })
    });

    app.put('/api/list/:id', function(req, res){
        let chosen = req.params.id;

        if(req.body.completed){
            db.Todolist.findOneAndUpdate({"_id":chosen}, {$set: {completed: req.body.completed}})
                .then(function(data){
                    res.json(req.body.completed)
                })
                .catch(function(err){
                    console.log(err);
                })
        }
        else{
            db.Todolist.findOneAndUpdate({"_id":chosen}, {$set: {completed: false}})
                .then(function(data){
                    res.json(data.completed)
                })
                .catch(function(err){
                    console.log(err);
                })
        }       
    });

    app.delete('/api/list/:id', function(req, res){
        let chosen = req.params.id;
        db.Todolist.findOneAndDelete({"_id": chosen})
            .then(function(data){
                res.json({"success": true})
            })
            .catch(function(err){
                console.log(err);
            })
    })  
}
