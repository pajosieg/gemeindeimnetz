const { strapiRequest, strapiPostRequest } = require("./globals/strapiRequest");
const { response } = require("./globals/response");

const getUser = async event => {
  const user = await strapiRequest(
    "accounts?CognitoId=" + event.pathParameters.id
  )
    .then(response => {
      console.log("responded user data", response.data);
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

const createUser = async event => {
  console.log(event.body);
  const user = await strapiPostRequest("accounts", event.body)
    .then(response => {
      console.log("responded user data", response.data);
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
  getUser,
  createUser
};
