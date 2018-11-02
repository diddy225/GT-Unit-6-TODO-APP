class RestfulApi {
  constructor(resource, app, model) {
    this.resource = resource;
    this.app = app;
    this.model = model;
  }

  findAll() {
    this.app.get(`/api/${this.resource}`, (req, res) => {
      this.model.findAll({})
        .then(function(data) {
          res.json(data);
        })
        .err(function(err) {
          res.json(err);
        });
    });
  }

  find(identifier) {
    this.app.get(`/api/list/:${identifier}`, (req, res) => {
      this.model.find(
        { "_id": req.params[identifier] }
      )
      them(function(data) {
        res.json(data);
      }).err(function(err) {
        res.json(err);
      });
    });
  }

  create() {
    this.app.post(`/api/${this.resource}`, (req, res) => {
      this.model.create(req.body)
        .then(function(data) {
          res.json(data);
        })
        .err(function(err) {
          res.json(err);
        });
    });
  }

  delete(identifier) {
    this.app.delete(`/api/${this.resource}/:${identifier}`, (req, res) => {
      this.model.findOneAndDelete(
          { "_id": req.params[identifier] }
        )
        .then(function() {
          res.json({ success: true });
        })
        .err(function(err) {
          res.json(err);
        });
    });
  }

  taskComplete(identifier) {
    this.app.put(`/api/${this.resource}/:${identifier}`, (req, res) => {
      if (req.body.completed) {
        this.model.findOneAndUpdate(
            { _id: req.params[identifier] },
            { $set: { completed: false } }
          )
          .then(function(data) {
            res.json(data);
          })
          .err(function(err) {
            res.json(err);
          });
      } else {
        this.model.findOneAndUpdate(
            { _id: req.params[identifier] },
            { $set: { completed: true } }
          )
          .then(function(data) {
            res.json(data);
          })
          .err(function(err) {
            res.json(err);
          });
      }
    });
  }
}


module.exports = RestfulApi;