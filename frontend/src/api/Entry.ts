import { FilterType } from '../components/FilterPanel/FilterPanel';
import { Entry } from '../models/Entry';
import { AuthenticationService } from '../services/AuthenticationService';
import {
  deleteRequestWithAuth,
  postRequestWithAuth,
  putRequestWithAuth,
} from './AWSGateway';
import { strapiGet } from './strapiRequest';

export const deleteEntry = async (entryId: number) => {
  const token = await AuthenticationService.getToken();
  return deleteRequestWithAuth('/entries/' + entryId, token);
};

export const createEntry = async (entry: Entry) => {
  const token = await AuthenticationService.getToken();
  return postRequestWithAuth('/entries', token, removeUnusedIdsFromEntry(entry));
};

export const updateEntry = async (entry: Entry) => {
  const token = await AuthenticationService.getToken();
  return putRequestWithAuth(
    '/entries/' + entry.id,
    token,
    removeUnusedIdsFromEntry(entry)
  );
};

export const getEntriesForCommunity = async (communityId: number) =>
  await strapiGet<Entry[]>(
    'entries?Community.id=' + communityId,
    'all entries for a given community'
  ).then(addIdsToEntries);

export const getFilteredEntries = async (filter: FilterType) => {
  const query = createQueryFromFilter(filter);
  return await strapiGet<Entry[]>('entries?' + query, 'filtered entries');
};

const createQueryFromFilter = ({
  association,
  community,
  location,
  categories,
  date,
}: FilterType) => {
  const query = [];
  if (association >= 0) query.push('Community.Association.id=' + association);
  if (community >= 0) query.push('Community.id=' + community);
  if (location >= 0) query.push('Community.ZipCode=' + location);
  date.forEach(dateEntry => query.push(`date=${dateEntry}`));
  categories.forEach(category => query.push(`category.id=${category.id}`));

  return query.join('&');
};

const addIdsToEntries = (entries: Entry[]): Entry[] => {
  return entries.map(entry => ({
    ...entry,
    communityId: entry.Community.id,
    accountId: entry.account?.id ?? -1,
    categoryId: entry.category.id,
  }));
};

const removeUnusedIdsFromEntry = (entry: Entry) => ({
  Community: entry.communityId,
  category: entry.categoryId,
  date: entry.date,
  time: entry.time,
  Title: entry.Title,
  Description: entry.Description,
  Link: entry.Link,
  account: entry.accountId,
});
