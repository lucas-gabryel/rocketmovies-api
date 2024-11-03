const { Router } = require('express');

const usersRouter = require('./user.routes');
const notesRouter = require('./movie_notes.routes');
const tagsRouter = require('./movie_tags.routes');

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/notes', notesRouter);
routes.use('/tags', tagsRouter);

module.exports = routes;