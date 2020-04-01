const strapiRequest = require("./globals/strapiRequest");
const { response } = require("./globals/response");

const getUser = async event => {
  const user = await strapiRequest(
    "frontend-users?CognitoId=" + event.pathParameters.id
  )
    .then(response => {
      console.log("responsed user data", response.data);
      return response.data;
    })
    .catch(e => {
      console.error(e);
    });

  if (user) {
    return response(200, {
      body: JSON.stringify(user)
    });
  } else {
    return response(500, {});
  }
};

module.exports = {
  getUser
};
