let list = require('../data/list.js');

module.exports = function(app){

    app.get('/api/list', function(req, res){
        res.json(list);
    });

    app.post('/api/list/items', function(req, res){
        let id = list.length;
        list.push(req.body)
        req.body.id = id;
        res.json(req.body);
    });

    app.get('/api/list/:index', function(req, res){
        res.json(list[req.params.index]);
    });

    app.put('/api/list', function(req, res){
        if(req.body.completed){
            list[req.body.id].completed = req.body.completed;
            res.send('Checkbox: checked, completed: true');
        }
        else if (!req.body.completed){
            list[req.body.id].completed = req.body.completed;
            res.send('Checkbox: unchecked, completed: false');
        }
    });

    app.delete('/api/list/:id', function(req, res){
        let chosen = req.params.id;
        const index = list.findIndex(e => parseFloat(e.id) === parseFloat(chosen));
        let success = false;

        if(index != -1){
            list.splice(index, 1);
            success = true;
        }
        res.send('You have removed an item')
    })
}
