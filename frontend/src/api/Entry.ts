import { CategoryFilterType } from "../components/CategoryFilter/CategoryFilter";
import { Entry } from "../models/Entry";
import { strapiGet } from "./strapiRequest";

export const createEntry = () => {};
export const getFilteredEntries = async (
  filter: CategoryFilterType
): Promise<Entry[]> => {
  const entries = await strapiGet("entries");
  console.log(entries);
  return entries;
};
export const readEntry = () => {};
export const updateEntry = () => {};
export const deleteEntry = () => {};
