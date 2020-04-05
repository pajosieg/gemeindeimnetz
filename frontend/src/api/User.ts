import { AuthenticationService } from '../services/AuthenticationService'
import { getRequestWithAuth, postRequestWithAuth } from './AWSGateway'

export const getUser = async () => {
  const token = await AuthenticationService.getToken()
  const cognitoId = AuthenticationService.getCognitoId()

  return getRequestWithAuth('/user/' + cognitoId, token)
    .then((res) => {
      if (res && res.length) {
        const user = res[0]
        user.Community = user.Community.id ? user.Community : null
        return res[0]
      } else {
        return null
      }
    })
    .catch((e) => console.error(e.message))
}

export const createUser = async (communityId: number) => {
  const token = await AuthenticationService.getToken()
  const cognitoId = AuthenticationService.getCognitoId()

  return postRequestWithAuth('/user', token, {
    CognitoId: cognitoId,
    Community: communityId,
  })
    .then((res) => {
      if (res.length) {
        return res[0]
      }
    })
    .catch((e) => console.error(e.message))
}
