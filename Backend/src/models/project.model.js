const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        project_title: {
            type: String,
            required: true,
        },
        guide: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Guide',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Project', projectSchema);
