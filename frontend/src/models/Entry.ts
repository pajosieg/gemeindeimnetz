import { Community } from './Community';
import { Category } from './Category';
import { User, UserWithCommunity } from './User';
import { getISODate } from '../utilities/DateUtilities';

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
  category: { name: 'Sonstiges', id: 6 },
  categoryId: 6,
  Community: account.Community,
  communityId: account.Community.id,
  account: account,
  accountId: account.id,
  date: getISODate(new Date()),
  time: '12:00',
  Link: '',
  id: -1,
});

export const sortEntriesByDateAndTime = (e1: Entry, e2: Entry) => {
  const compareDate = e1.date.localeCompare(e2.date);
  if (compareDate === 0) {
    return e1.time.localeCompare(e2.time);
  }
  return compareDate;
};
