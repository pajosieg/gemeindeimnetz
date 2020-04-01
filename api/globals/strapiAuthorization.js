const axios = require("axios");
const login = process.env.STRAPI_LOGIN || "";
const password = process.env.STRAPI_PASSWORD || "";
const baseUrl = process.env.STRAPI_BASE_URL || "";

const getToken = () => {
  return axios
    .post(`${baseUrl}/auth/local`, {
      identifier: login,
      password: password
    })
    .then(response => {
      console.log(response.data);
      return response.data.jwt;
    })
    .catch(e => console.error(e));
};

module.exports = getToken;
