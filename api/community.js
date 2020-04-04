const { strapiPostRequest } = require("./globals/strapiRequest");
const { createUser } = require("./user.js");
const { response } = require("./globals/response");

const createCommunity = async event => {
  console.log(event.body);
  const communityData = JSON.parse(event.body).community;
  const userData = JSON.parse(event.body).user;

  const community = await strapiPostRequest(
    "communities",
    JSON.stringify(communityData)
  )
    .then(response => {
      console.log("responded data", response.data);
      console.log("responded body", response.body);
      return response.data;
    })
    .catch(e => {
      console.error(e);
    });

  if (community) {
    userData.Community = community.id;
    await createUser({ body: JSON.stringify(userData) }).catch(console.error);
    return response(200, {
      body: JSON.stringify(community)
    });
  } else {
    return response(500, {});
  }
};

module.exports = {
  createCommunity
};
