const https = require("https");
const userInfoUrl = process.env.USER_INFO_URL || "";

module.exports = {
  checkAuthentication: async auth_headers => {
    const authResponse = await new Promise(resolve => {
      https.get(userInfoUrl, { headers: auth_headers }, res => resolve(res));
    });

    if (authResponse.ok) {
      return true;
    } else {
      return false;
    }
  }
};
