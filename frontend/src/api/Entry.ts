import { CategoryFilterType } from "../components/CategoryFilter/CategoryFilter";
import { Entry } from "../models/Entry";
import { strapiGet } from "./strapiRequest";

export const createEntry = () => {};

export const getFilteredEntries = async (
  filter: CategoryFilterType
): Promise<Entry[]> => {
  const queriesFromCategories = convertCategoryToQuery(filter);

  const entries = await queriesFromCategories.reduce<Promise<Entry[]>>(
    async (promise, query) => {
      return promise.then(async result =>
        Promise.resolve(result.concat(await strapiGet("entries?" + query)))
      );
    },
    Promise.resolve([])
  );

  return entries;
};
export const readEntry = () => {};
export const updateEntry = () => {};
export const deleteEntry = () => {};

const convertCategoryToQuery = ({ categories }: CategoryFilterType) => {
  const queries = categories
    .filter(category => category.checked)
    .map(category => `category.name=${category.name}`);

  return queries.length ? queries : [""];
};

export const getEntriesForCommunity = async (communityId: number) =>
  await strapiGet("entries?Community.id=" + communityId);
