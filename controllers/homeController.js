const mongoose = require('mongoose');
const Reminder = mongoose.model('Reminder'); // See Store.js where this is exported!

exports.homePage = (req, res) => {
    res.render('index', { title: 'Homepage' });
};

exports.createReminder = async (req, res) => {
    const reminder = await (new Reminder(req.body)).save();
    req.flash('success', `Successfully created reminder '${reminder.name}'.`);
    res.redirect(`/`);
    // Note: errors are handled within the exports.catchErrors() function in errorHandlers.js - see video 11 @ 12mins for explanation
};

exports.getReminders = async (req, res) => {
    // Query the database for a list of all reminders
    const reminders = await Reminder.find();
    console.log(reminders);
    res.render('index', { title: 'Homepage', reminders });
};