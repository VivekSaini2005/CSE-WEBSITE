const healthService = require('../services/healthService');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const checkHealth = asyncHandler(async (req, res) => {
  const data = healthService.getHealthStatus();
  return res.status(200).json(
    new ApiResponse(200, data, 'Server is healthy')
  );
});

module.exports = {
  checkHealth,
};
