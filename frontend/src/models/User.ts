import { Community } from './Community';

export type User = {
  id: number;
  Community: Community | null;
  CognitoId: string;
};
