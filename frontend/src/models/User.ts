import { Community } from "./Community";

export type User = {
  id: number;
  Community: Community;
  CognitoId: string;
};
