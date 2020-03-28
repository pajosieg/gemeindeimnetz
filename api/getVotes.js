const getVotes = async () => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: '{ "votes": 99.3 }'
  };
};

module.exports.getVotes = getVotes;
