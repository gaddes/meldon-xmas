const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reminderSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // Remove whitespace
        required: 'Please enter a reminder!'
    },
    // description: {
    //     type: String,
    //     trim: true
    // },
    created: {
        type: Date,
        default: Date.now
    }
}, {
    // Make sure virtuals are visible when we take a pre= h.dump (by default they are not!)
    // Note we can still use the virtual fields without this step, but it's nice to see them for debugging (and dumping!)
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Define our indexes
reminderSchema.index({
    name: 'text'
});

module.exports = mongoose.model('Reminder', reminderSchema);