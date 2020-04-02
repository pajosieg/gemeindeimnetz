import { Community } from "./Community";
import { Category } from "./Category";

export type Entry = {
  category: Category;
  date: Date;
  association: string;
  Community: Community;
  Title: string;
  Description: string;
  Link: string;
  id: number;
};
