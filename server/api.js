const express = require('express');
const apiRouter = express.Router();
const errorHandler = require('errorhandler');

const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');
const meetingsRouter = require('./meetings');
const workRouter = require('./work');

apiRouter.use(errorHandler());
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/work', workRouter);

module.exports = apiRouter;
