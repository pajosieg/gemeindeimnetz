const axios = require("axios");
const getToken = require("./strapiAuthorization");
const baseUrl = process.env.STRAPI_BASE_URL || "";

const getHeaders = token => ({
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json"
  }
});

const executeAuthRequest = async (method, errorMessage) => {
  const token = await getToken();

  if (token) {
    return method(getHeaders(token)).catch(e => console.error(errorMessage, e));
  } else {
    return Promise.reject(new Error("Error while authenticating to strapi"));
  }
};

const strapiRequest = async path => {
  console.log("query:", `${baseUrl}/${path}`);
  const getRequest = headers => axios.get(`${baseUrl}/${path}`, headers);
  return executeAuthRequest(
    getRequest,
    "Error while loading data from strapi (GET)"
  );
};

const strapiPostRequest = async (path, data) => {
  console.log("data in strapi post:", data);
  console.log("query:", `${baseUrl}/${path}`);

  const postRequest = headers =>
    axios.post(`${baseUrl}/${path}`, data, headers);
  return executeAuthRequest(
    postRequest,
    "Error while posting data to strapi (POST)"
  );
};

const strapiPutRequest = async (path, data) => {
  console.log("data in strapi put:", data);
  console.log("query:", `${baseUrl}/${path}`);

  const putRequest = headers => axios.put(`${baseUrl}/${path}`, data, headers);
  return executeAuthRequest(
    putRequest,
    "Error while putting data to strapi (PUT)"
  );
};

const strapiDeleteRequest = async path => {
  console.log("query:", `${baseUrl}/${path}`);

  const deleteRequest = headers => axios.delete(`${baseUrl}/${path}`, headers);
  return executeAuthRequest(
    deleteRequest,
    "Error while deleting data on strapi (DELETE)"
  );
};

module.exports = {
  strapiRequest,
  strapiPostRequest,
  strapiDeleteRequest,
  strapiPutRequest
};
