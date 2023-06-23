const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/task', (req, res, next) => {
    db.query(
      'INSERT INTO tasks (task, description, status) VALUES (?,?,?)',
      [req.body.title, req.body.description, req.body.status],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok', id: result.insertId});
        }
      }
    );
  });

  router.get('/tasks', function (req, res, next) {
    db.query(
      'SELECT * FROM tasks',
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/task/:id', function (req, res, next) {
    db.query(
      'UPDATE tasks SET task=?, description=?, status=? WHERE id=?',
      [req.body.title, req.body.description, req.body.status, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/task/:id', function (req, res, next) {
    db.query(
      'DELETE FROM tasks WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;