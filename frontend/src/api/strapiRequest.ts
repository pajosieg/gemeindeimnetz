import axios from "axios";
const baseUrl = "https://cms.gemeinde-im-netz.de";

export const strapiGet = async (path: string) => {
  return await axios
    .get(`${baseUrl}/${path}`)
    .then(({ data }) => data)
    .catch(e => console.log("Error while loading data from strapi api", e));
};
