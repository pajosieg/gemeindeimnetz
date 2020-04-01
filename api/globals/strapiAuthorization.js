const axios = require("axios");

const getToken = () => {
  return axios
    .post("https://cms.gemeinde-im-netz.de/auth/local", {
      identifier: "frontend",
      password: "12345678"
    })
    .then(response => {
      console.log(response.data);
      return response.data.jwt;
    })
    .catch(e => console.error(e));
};

module.exports = getToken;
