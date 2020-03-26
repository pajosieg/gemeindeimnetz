const { checkAuthentication } = require("./auth/authenticator");
const { response } = require("./globals/response");

const getTime = async event => {
  const check = await checkAuthentication(
    event.headers ? event.headers.Authorization : ""
  );
  return Promise.resolve(
    response(200, {
      body: { time: Date.now(), res: check.statusCode }
    })
  );
};

module.exports.getTime = getTime;
