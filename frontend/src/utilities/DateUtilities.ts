export const getISODate = (date: Date) => {
  return date.toISOString().substring(0, 10);
};
