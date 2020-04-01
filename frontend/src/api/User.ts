import { API } from "aws-amplify";
import { AuthenticationService } from "../services/Auth";
import { getRequestWithAuth, postRequestWithAuth } from "./AWSGateway";

export const getUser = async () => {
  const token = await AuthenticationService.getToken();
  const cognitoId = AuthenticationService.getCognitoId();

  return getRequestWithAuth("/user/" + cognitoId, token)
    .then(res => {
      if (res.length) {
        return res[0];
      }
    })
    .catch(e => console.error(e.message));
};

export const createUser = async () => {
  const token = await AuthenticationService.getToken();
  const cognitoId = AuthenticationService.getCognitoId();

  return postRequestWithAuth("/user/" + cognitoId, token, { cognitoId })
    .then(res => {
      if (res.length) {
        return res[0];
      }
    })
    .catch(e => console.error(e.message));
};
