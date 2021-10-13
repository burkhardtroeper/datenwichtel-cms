const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    commentIsApproved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Comment', commentSchema);