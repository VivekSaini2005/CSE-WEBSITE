const getHealthStatus = () => {
  return {
    status: 'up',
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  getHealthStatus,
};
