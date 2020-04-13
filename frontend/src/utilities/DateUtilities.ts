import { SeriesDay, CopySeriesEntry } from '../components/Community/EntrieCopier';
import { Entry } from '../models/Entry';

export const getISODate = (date: Date) => {
  return date.toISOString().substring(0, 10);
};

const dayInSeries = (date: Date, days: SeriesDay[]) => {
  return days[date.getDay()].checked;
};

export const generateEntriesForSeries = (
  entry: Entry,
  { startDate, endDate, time, seriesDays }: CopySeriesEntry
) => {
  let entries: Entry[] = [];
  const currentDay = new Date(startDate);
  const lastDayTime = new Date(endDate).getTime();

  while (currentDay.getTime() <= lastDayTime) {
    if (dayInSeries(currentDay, seriesDays)) {
      entries.push({ ...entry, id: -1, time, date: getISODate(currentDay) });
    }
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return entries;
};
