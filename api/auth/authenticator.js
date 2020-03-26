const https = require("https");
const userInfoUrl = process.env.USER_INFO_URL || "";

module.exports = {
  checkAuthentication: async auth_headers => {
    const authResponse = await new Promise(resolve => {
      https.get(
        userInfoUrl,
        {
          headers: {
            Authorization: auth_headers || "",
            Accept: "application/json"
          },
          "strict-ssl": false
        },
        res => resolve(res)
      );
    });

    if (authResponse.ok) {
      return true;
    } else {
      return false;
    }
  }
};
