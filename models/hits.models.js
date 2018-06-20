const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HitsSchema = new Schema({
        created_at: {
            type: Date,
            default: Date.now
        },
        title: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        },
        author: {
            type: String,
            default: null
        },
        story_id: {
            type: String,
            default: null
        },
        story_title: {
            type: String,
            default: null
        },
        story_url: {
            type: String,
            default: null
        },
        objectID: {
            type: Number,
        },
        isDeleted: {
            type: Boolean,
            default: true
        }
});

const Hits = mongoose.model('Hit', HitsSchema);

module.exports = Hits;