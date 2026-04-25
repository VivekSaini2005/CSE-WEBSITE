const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

exports.createOne = (Model) =>
    asyncHandler(async (req, res) => {
        const doc = await Model.create(req.body);

        return res.status(201).json(
            new ApiResponse(201, doc, "Document created successfully")
        );
    });

exports.getAll = (Model) =>
    asyncHandler(async (req, res) => {
        const docs = await Model.find({}).sort({ createdAt: -1 });

        return res.status(200).json(
            new ApiResponse(200, docs, "Documents fetched successfully")
        );
    });

exports.updateOne = (Model) =>
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const doc = await Model.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!doc) {
            throw new ApiError(404, "Document not found");
        }

        return res.status(200).json(
            new ApiResponse(200, doc, "Document updated successfully")
        );
    });

exports.deleteOne = (Model) =>
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const doc = await Model.findByIdAndDelete(id);

        if (!doc) {
            throw new ApiError(404, "Document not found");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Document deleted successfully")
        );
    });
