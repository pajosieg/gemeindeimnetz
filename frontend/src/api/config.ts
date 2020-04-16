type EnvConfig = {
  apiUrl: string;
  userPoolId: string;
  userPoolClientId: string;
  cmsBaseUrl: string;
};

type Config = { dev: EnvConfig; prod: EnvConfig };

const config: Config = {
  dev: {
    apiUrl: 'https://ly1bd4rpe3.execute-api.eu-central-1.amazonaws.com/dev',
    userPoolId: 'eu-central-1_6WjHy69OW',
    userPoolClientId: '77f7tj1b7928meqi7id79afrbb',
    cmsBaseUrl: 'https://cms-dev.gemeinde-im-netz.de',
  },
  prod: {
    apiUrl: 'https://vpf31jl656.execute-api.eu-central-1.amazonaws.com/prod',
    userPoolId: 'eu-central-1_6WjHy69OW',
    userPoolClientId: '77f7tj1b7928meqi7id79afrbb',
    cmsBaseUrl: 'https://cms.gemeinde-im-netz.de',
  },
};

export const getEnvironmentConfig = () => {
  const hostName = window.location.hostname;
  if (hostName === 'www.gemeinde-im-netz.de' || hostName === 'gemeinde-im-netz.de') {
    return config.prod;
  }
  return config.dev;
};
