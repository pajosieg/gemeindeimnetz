import { getUser } from "./User";

export const createCommunity = () => {};
export const getFilteredCommunities = () => {};
export const getLoggedInCommunity = async () => {
  return (await getUser()).Community;
};
export const updateCommunity = () => {};
export const deleteCommunity = () => {};
