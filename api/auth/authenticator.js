const userInfoUrl = process.env.USER_INFO_URL;

export const checkAuthentication = async auth_header => {
  const authResponse = await fetch(userInfoUrl, {
    headers: {
      Authorization: auth_header
    }
  });

  if (authResponse.ok) {
    return true;
  } else {
    return false;
  }
};
