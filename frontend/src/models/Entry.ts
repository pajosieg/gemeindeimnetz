import { Community } from "./Community";
import { Category } from "./Category";
import { User } from "./User";

export type Entry = {
  category: Category;
  categoryId: number;
  date: string;
  time: string;
  Community: Community;
  communityId: number;
  Title: string;
  Description: string;
  Link: string;
  id: number;
  account: User | null;
  accountId: number;
};
