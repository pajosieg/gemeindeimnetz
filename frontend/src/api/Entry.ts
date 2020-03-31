import { CategoryFilterType } from "../components/CategoryFilter/CategoryFilter";
import { Entry } from "../models/Entry";

export const createEntry = () => {};
export const getFilteredEntries = (filter: CategoryFilterType): Entry[] => {
  const cardContent = {
    description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
                      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor…`,
    title: "Title of Entry",
    association: "Bistum Mainz",
    community: "Gemeinde XYZ",
    link: "link/to/resource",
    category: "Gottesdienst"
  };

  return [cardContent, cardContent, cardContent];
};
export const readEntry = () => {};
export const updateEntry = () => {};
export const deleteEntry = () => {};
