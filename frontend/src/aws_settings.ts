import { getEnvironmentConfig } from './api/config';

export default {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'eu-central-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: getEnvironmentConfig().userPoolId,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: getEnvironmentConfig().userPoolClientId,
  },
  API: {
    endpoints: [
      {
        name: 'gemeinde-im-netz-api',
        endpoint: getEnvironmentConfig().apiUrl,
      },
    ],
  },
};
