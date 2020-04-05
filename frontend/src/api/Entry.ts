import { FilterType } from "../components/CategoryFilter/CategoryFilter";
import { Entry } from "../models/Entry";
import { strapiGet } from "./strapiRequest";
import {
  postRequestWithAuth,
  deleteRequestWithAuth,
  putRequestWithAuth
} from "./AWSGateway";
import { AuthenticationService } from "../services/AuthenticationService";

export const deleteEntry = async (entryId: number) => {
  const token = await AuthenticationService.getToken();

  return deleteRequestWithAuth("/entries/" + entryId, token);
};

export const createEntry = async (entry: Entry) => {
  const token = await AuthenticationService.getToken();

  return postRequestWithAuth(
    "/entries",
    token,
    removeUnusedIdsFromEntry(entry)
  );
};

export const getFilteredEntries = async (filter: FilterType) => {
  const request = async (query: string) => {
    return await strapiGet<Entry[]>("entries?" + query);
  };

  return mapFilterToQueries(filter, request);
};

const mapFilterToQueries = async (
  filter: FilterType,
  request: (query: string) => Promise<Entry[]>
) => {
  const queriesFromCategories = convertCategoryToQuery(filter);

  const entries = await queriesFromCategories.reduce<Promise<Entry[]>>(
    async (promise, query) => {
      return promise.then(async result =>
        Promise.resolve(result.concat(await request(query)))
      );
    },
    Promise.resolve([])
  );

  return entries;
};

export const updateEntry = async (entry: Entry) => {
  const token = await AuthenticationService.getToken();

  return putRequestWithAuth(
    "/entries/" + entry.id,
    token,
    removeUnusedIdsFromEntry(entry)
  );
};

const convertCategoryToQuery = ({ categories }: FilterType) => {
  const queries = categories
    .filter(category => category.checked)
    .map(category => `category.name=${category.name}`);

  return queries.length ? queries : [""];
};

export const getEntriesForCommunity = async (communityId: number) =>
  await strapiGet<Entry[]>("entries?Community.id=" + communityId).then(
    addIdsToEntries
  );

const addIdsToEntries = (entries: Entry[]): Entry[] => {
  return entries.map(entry => ({
    ...entry,
    communityId: entry.Community.id,
    accountId: entry.account?.id ?? -1,
    categoryId: entry.category.id
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
  account: entry.accountId
});
