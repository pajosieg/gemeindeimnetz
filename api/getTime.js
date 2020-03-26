const { checkAuthentication } = require("./auth/authenticator");
const { response } = require("./globals/response");

const getTime = async event => {
  if (await checkAuthentication(event.headers)) {
    return response(200, {
      body: Date.now()
    });
  } else {
    return response(200, {
      body: "not authorized!"
    });
  }
};

module.exports.getTime = getTime;
