const Testimonial = require('../models/testimonial.model');
const { createOne, getAll, getOne, updateOne, deleteOne } = require('../services/crudFactory');

const getAllTestimonials = getAll(Testimonial);
const getTestimonialById = getOne(Testimonial);
const createTestimonial = createOne(Testimonial);
const updateTestimonial = updateOne(Testimonial);
const deleteTestimonial = deleteOne(Testimonial);

module.exports = {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};
