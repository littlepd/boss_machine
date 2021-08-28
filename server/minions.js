const minionsRouter = require('express').Router();

const {
   addToDatabase,
   updateInstanceInDatabase,
   deleteFromDatabasebyId,
   getAllFromDatabase,
   getFromDatabaseById,
   findDataArrayByName
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
   const minion = getFromDatabaseById('minions', id);
   if (!minion) {
      res.status(404).send();
   } else {
      req.minion = minion;
      next();
   }
});

minionsRouter.get('/', (req, res, next) => {
   res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
   res.status(201).send(addToDatabase('minions', req.body));
});

minionsRouter.get('/:minionId', (req, res, next) => {
   res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
   res.send(updateInstanceInDatabase('minions', req.body));
});

minionsRouter.delete('/:minionId', (req, res, next) => {
   res.status(204).send(deleteFromDatabasebyId('minions', req.params.minionId));
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
   const minionId = req.minion.id;
   const work = getAllFromDatabase('work');
   const minionWork = [];
   for (let i = 0; i < work.length; i++) {
      if (work[i].id === minionId) {
         minionWork.push(work[i]);
      }
   }
   res.status(200).send(minionWork);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
   res.status(201).send(addToDatabase('work', req.body));
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
   const minionId = Number(req.params.workId);
   const work = getFromDatabaseById('work', req.params.workId);
   if (isNaN(minionId) || work.minionId !== req.params.minionId) {
      res.status(400).send();
   } else {
      res.send(updateInstanceInDatabase('work', req.body));
   }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
   res.status(204).send(deleteFromDatabasebyId('work', req.params.minionId));
});

module.exports = minionsRouter;