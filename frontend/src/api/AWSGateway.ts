import { API } from "aws-amplify";

export const getRequestWithAuth = async (path: string, token: string) => {
  return API.get("gemeinde-im-netz-api", path, {
    headers: {
      Authorization: token
    }
  }).catch(e =>
    console.error("Error while requesting aws GET with auth.", e.message)
  );
};

export const postRequestWithAuth = async (
  path: string,
  token: string,
  body: object
) => {
  return API.post("gemeinde-im-netz-api", path, {
    headers: {
      Authorization: token
    },
    body
  }).catch(e =>
    console.error("Error while requesting aws POST with auth.", e.message)
  );
};
