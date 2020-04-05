import axios from 'axios';
const baseUrl = 'https://cms.gemeinde-im-netz.de';

export const strapiGet = async <T>(
  path: string,
  requestTypeForErrorMessage: string
): Promise<T> => {
  return await axios
    .get(`${baseUrl}/${path}`)
    .then(({ data }) => data)
    .catch(e =>
      console.log(`Error while loading ${requestTypeForErrorMessage} from strapi`, e)
    );
};
