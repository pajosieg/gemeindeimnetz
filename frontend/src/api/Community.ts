import { getUser } from "./User";
import { strapiGet } from "./strapiRequest";

export const createCommunity = () => {};

export const getCommunitiesForAssociation = async (associationId: string) =>
  strapiGet("communities?Association.id=" + (associationId || "-1")) ?? [];

export const getAllCommunities = async () => strapiGet("communities");

export const getLoggedInCommunity = async () =>
  (await getUser())?.Community || null;

export const updateCommunity = () => {};

export const deleteCommunity = () => {};
