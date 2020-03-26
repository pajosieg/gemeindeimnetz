import { checkAuthentication } from "./auth/authenticator";
import { response } from "./globals/response";

export const getTime = async event => {
  event.request.headers;

  if (await checkAuthentication(event.request.headers)) {
    return response(200, {
      body: Date.now()
    });
  } else {
    return response(200, {
      body: "not authorized!"
    });
  }
};
