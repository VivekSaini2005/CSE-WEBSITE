const Testimonial = require('../models/testimonial.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllTestimonials = getAll(Testimonial);
const createTestimonial = createOne(Testimonial);
const updateTestimonial = updateOne(Testimonial);
const deleteTestimonial = deleteOne(Testimonial);

module.exports = {
    getAllTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};
