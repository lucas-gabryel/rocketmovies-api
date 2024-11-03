const { Router } = require('express');

const MovieNotesController = require('../controllers/NotesController');

const notesRoutes = Router();

const movieNotesController = new MovieNotesController();

notesRoutes.post('/:user_id', movieNotesController.create);
notesRoutes.get('/:id', movieNotesController.show);

module.exports = notesRoutes;