import { getUser } from './User'
import { strapiGet } from './strapiRequest'
import { Community } from '../models/Community'
import { postRequestWithAuth } from './AWSGateway'
import { AuthenticationService } from '../services/AuthenticationService'

export const createCommunity = async (community: Community) => {
  const token = await AuthenticationService.getToken()
  const cognitoId = AuthenticationService.getCognitoId()

  return postRequestWithAuth('/communities', token, {
    community: {
      Name: community.Name,
      Association: community.AssociationId,
      ZipCode: community.ZipCode,
      City: '',
    },
    user: {
      CognitoId: cognitoId,
    },
  })
    .then((res) => {
      if (res.length) {
        return res[0]
      }
    })
    .catch((e) => console.error(e.message))
}

export const getCommunitiesForAssociation = async (associationId: number) =>
  strapiGet<Community[]>('communities?Association.id=' + (associationId || -1)) ?? []

export const getAllCommunities = async () => strapiGet('communities')

export const getLoggedInCommunity = async () => (await getUser())?.Community || null

export const updateCommunity = () => {}

export const deleteCommunity = () => {}
