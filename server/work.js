const workRouter = require('express').Router();

const {
   addToDatabase,
   updateInstanceInDatabase,
   deleteFromDatabasebyId,
   getAllFromDatabase,
   getFromDatabaseById,
} = require('./db');

workRouter.param('id', (req, res, next, id) => {
   const work = getFromDatabaseById('work', id);
   if (!work) {
      res.status(404).send();
   } else {
      req.work = work;
      next();
   }
});

workRouter.get('/', (req, res, next) => {
   res.send(getAllFromDatabase('work'));
});

workRouter.get('/:minionId', (req, res, next) => {
   res.send(req.work);
});

workRouter.post('/:minionId', (req, res, next) => {
   res.status(201).send(addToDatabase('work', req.body));
});

workRouter.put('/:minionId/:workId', (req, res, next) => {
   res.send(updateInstanceInDatabase('work', req.body));
});

workRouter.delete('/:minionId/:workId', (req, res, next) => {
   res.status(204).send(deleteFromDatabasebyId('work', req.params.minionId));
});

module.exports = workRouter;