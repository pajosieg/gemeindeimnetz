const { response } = require("./globals/response");

const getTime = async event => {
  return Promise.resolve(
    response(200, {
      body: JSON.stringify({ time: Date.now() })
    })
  );
};

module.exports.getTime = getTime;
