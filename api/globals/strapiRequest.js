const axios = require("axios");
const getToken = require("./strapiAuthorization");
const baseUrl = "https://cms.gemeinde-im-netz.de";

const strapiRequest = async path => {
  const token = await getToken();

  return axios
    .get(`${baseUrl}/${path}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .catch(e => console.error("Error while loading data from strapi", e));
};

module.exports = strapiRequest;
