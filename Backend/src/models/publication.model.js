const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        authors: {
            type: [String],
            required: true,
        },
        venue: {
            type: String,
        },
        year: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Publication', publicationSchema);
