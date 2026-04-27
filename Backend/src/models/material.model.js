const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    resources: [resourceSchema],
});

const materialSchema = new mongoose.Schema(
    {
        semester: {
            type: String,
            required: true,
        },
        subjects: [subjectSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Material', materialSchema);
