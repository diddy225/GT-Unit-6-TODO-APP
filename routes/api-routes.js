let list = require('../data/list.js');

module.exports = function(app){

    app.get('/api/list', function(req, res){
        res.json(list);
    });

    app.post('/api/list', function(req, res){
        list.push(req.body);
        res.json(req.body);
    });

    app.get('/api/list/:index', function(req, res){
        res.json(list[req.params.index]);
    });

    app.put('/api/list/:index', function(req, res){
        list[req.params.index].completed = true;
        res.json({ success: true });
    });

    app.delete('/api/list/:index', function(req, res){
        list.splice(req.params.index, 1);
        res.json({ success: true });
    });
}
