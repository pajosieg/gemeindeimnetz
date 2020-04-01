import { Community } from "./Community";

export type User = {
  id: string;
  Community: Community;
  CognitoId: string;
};
