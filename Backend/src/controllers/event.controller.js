const Event = require('../models/event.model');
const { createOne, getAll, updateOne, deleteOne, getOne } = require('../services/crudFactory');

const getAllEvents = getAll(Event);
const getEventById = getOne(Event);
const createEvent = createOne(Event);
const updateEvent = updateOne(Event);
const deleteEvent = deleteOne(Event);

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
