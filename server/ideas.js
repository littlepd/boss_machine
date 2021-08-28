const ideasRouter = require('express').Router();

const {
   addToDatabase,
   updateInstanceInDatabase,
   deleteFromDatabasebyId,
   getAllFromDatabase,
   getFromDatabaseById,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('id', (req, res, next, id) => {
   const idea = getFromDatabaseById('ideas', id);
   if (!idea) {
      res.status(404).send();
   } else {
      req.idea = idea;
      next();
   }
});

ideasRouter.get('/', (req, res, next) => {
   res.send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:id', (req, res, next) => {
   res.send(req.idea);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
   res.status(201).send(addToDatabase('ideas', req.body));
});

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
   res.send(updateInstanceInDatabase('ideas', req.body));
});

ideasRouter.delete('/:id', (req, res, next) => {
   const deleteIdea = deleteFromDatabasebyId('ideas', req.params.id);
   if (deleteIdea) {
      res.status(204);
   } else {
      res.status(500);
   }
   res.send();
});

module.exports = ideasRouter;