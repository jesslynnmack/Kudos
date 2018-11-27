const User = require('../models/User');
const Kudos = require('../models/kudos');

module.exports = function (app) {

  app.get('/api/user', function (req, res) {
    User.find({})
      .populate('kudosPosts')
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.get('/api/user/:id', function (req, res) {
    User.find({ _id: req.params.id })
      .populate('kudosPosts')
      .then(function (data) {
        console.log('data', data)
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
  app.delete('/api/user/:id', function (req, res) {
    User.findOneAndDelete({_id: req.params.id})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.post('/api/user', function (req, res) {
    User.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.get('/api/kudos', function (req, res) {
    Kudos.find({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.post('/api/kudos', function (req, res) {
    const userId = req.body.userId;
    const newEntry = {
      title: req.body.title,
      body: req.body.body,
      to: req.body.to,
      from: req.body.from,
      userId: req.body.userId
    }

    Kudos.create(newEntry)
      .then(function (kudosData) {
        return User.findOneAndUpdate({_id: userId}, { $push: { kudosPosts: kudosData._id } }, { new: true });
      })
      .then(function (userData) {
        res.json(userData);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
  app.delete('/api/kudos/:id', function (req, res) {
    Kudos.findOneAndDelete({_id: req.params.id})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
}
