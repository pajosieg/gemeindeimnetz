import { Community } from './Community';
import { Category } from './Category';
import { User, UserWithCommunity } from './User';

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

export const createEmptyEntry = (account: UserWithCommunity) => ({
  Title: '',
  Description: '',
  category: { name: '', id: -1 },
  categoryId: -1,
  Community: account.Community,
  communityId: account.Community.id,
  account: account,
  accountId: account.id,
  date: new Date().toISOString().substring(0, 10),
  time: '12:00',
  Link: '',
  id: -1,
});
