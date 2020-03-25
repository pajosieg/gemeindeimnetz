const getTime = async () => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: Date.now()
  };
};

module.exports.getTime = getTime;
