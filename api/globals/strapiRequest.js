const axios = require("axios");
const getToken = require("./strapiAuthorization");
const baseUrl = process.env.STRAPI_BASE_URL || "";

const strapiRequest = async path => {
  const token = await getToken();
  console.log("query:", `${baseUrl}/${path}`);
  if (token) {
    return axios
      .get(`${baseUrl}/${path}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .catch(e => console.error("Error while loading data from strapi", e));
  } else {
    return Promise.reject(new Error("Error while authenticating to strapi"));
  }
};

module.exports = strapiRequest;
