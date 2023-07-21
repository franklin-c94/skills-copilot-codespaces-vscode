// Create web server
var express = require('express');
var router = express.Router();
var db = require('../db');

// GET /comments
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM comments', function(err, result) {
    if (err) {
      next(err);
      return;
    }
    res.send(result.rows);
  });
});

// POST /comments
router.post('/', function(req, res, next) {
  db.query(
    'INSERT INTO comments (body) VALUES ($1) RETURNING id',
    [req.body.body],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send(result.rows[0]);
    }
  );
});

// PUT /comments/:id
router.put('/:id', function(req, res, next) {
  db.query(
    'UPDATE comments SET body=$1 WHERE id=$2 RETURNING id',
    [req.body.body, req.params.id],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send(result.rows[0]);
    }
  );
});

// DELETE /comments/:id
router.delete('/:id', function(req, res, next) {
  db.query('DELETE FROM comments WHERE id=$1', [req.params.id], function(err) {
    if (err) {
      next(err);
      return;
    }
    res.send({success: true});
  });
});

module.exports = router;