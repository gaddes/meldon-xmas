const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(reminderController.getReminders)); // catchErrors() wrapper used whenever our function is async - see getReminders() defined in reminderController.js
router.post('/', catchErrors(reminderController.createReminder));
router.get('/:id', catchErrors(reminderController.deleteReminder));

module.exports = router;
