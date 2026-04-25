const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
        },
        category: {
            type: String,
        },
        pdfUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Syllabus', syllabusSchema);
