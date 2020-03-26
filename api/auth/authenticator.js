const userInfoUrl = process.env.USER_INFO_URL;

module.exports = {
  checkAuthentication: async auth_headers => {
    const authResponse = await fetch(userInfoUrl, {
      headers: auth_headers
    });

    if (authResponse.ok) {
      return true;
    } else {
      return false;
    }
  }
};
