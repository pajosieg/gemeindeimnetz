const strapiRequest = require("./globals/strapiRequest");
const { response } = require("./globals/response");

const getUser = async event => {
  console.log(event.path);
  const user = await strapiRequest(
    "frontend-users?CognitoId=" + event.path.id
  ).then(response => {
    console.log("responsed user data", response.data);
    return response.data;
  });

  return response(200, {
    body: JSON.stringify(user)
  });
};

module.exports = {
  getUser
};
