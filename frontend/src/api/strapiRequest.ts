import axios from 'axios'
const baseUrl = 'https://cms.gemeinde-im-netz.de'

export const strapiGet = async <T>(path: string): Promise<T> => {
  return await axios
    .get(`${baseUrl}/${path}`)
    .then(({ data }) => {
      console.log(data)
      return data
    })
    .catch((e) => console.log('Error while loading data from strapi api', e))
}
