const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        domain: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Guide', guideSchema);
