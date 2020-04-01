export default {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: "eu-central-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID

    // OPTIONAL - Hosted UI configuration
    // oauth: {
    //   domain: "https://gemeinde-im-netz.auth.eu-central-1.amazoncognito.com",
    //   scope: ["openid"],
    //   redirectSignIn: process.env.REACT_APP_REDIRECT_SIGN_IN,
    //   redirectSignOut: process.env.REACT_APP_REDIRECT_SIGN_OUT,
    //   responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
    // }
  },
  API: {
    endpoints: [
      {
        name: "gemeinde-im-netz-api",
        endpoint: window.env.apiUrl
      }
    ]
  }
};
