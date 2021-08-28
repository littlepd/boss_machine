const meetingsRouter = require('express').Router();

const { createMeeting,
   addToDatabase,
   deleteAllFromDatabase,
   getAllFromDatabase,
} = require('./db');

meetingsRouter.get('/', (req, res, next) => {
   res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
   const addedMeeting = addToDatabase('meetings', createMeeting());
   if (addedMeeting) {
      res.status(201).send(addedMeeting);
   } else {
      res.status(400).send();
   }
});

meetingsRouter.delete('/', (req, res, next) => {
   const allDeleted = deleteAllFromDatabase('meetings');
   if (allDeleted) {
      res.status(204).send();
   } else {
      res.status(500).send();
   }
});

module.exports = meetingsRouter;
