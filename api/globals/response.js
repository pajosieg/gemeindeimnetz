const responseCors = {
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
};

module.exports = {
  response: (statusCode, payload) => {
    return {
      ...responseCors,
      statusCode,
      ...payload
    };
  }
};
