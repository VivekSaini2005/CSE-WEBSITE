const Event = require('../models/event.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllEvents = getAll(Event);
const createEvent = createOne(Event);
const updateEvent = updateOne(Event);
const deleteEvent = deleteOne(Event);

module.exports = {
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent
};
