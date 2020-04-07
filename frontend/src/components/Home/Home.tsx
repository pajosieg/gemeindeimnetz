import * as React from 'react';
import { getFilteredEntries } from '../../api/Entry';
import { Entry } from '../../models/Entry';
import { Card } from '../Card/Card';
import { FilterPanel, FilterType } from '../FilterPanel/FilterPanel';
import './Home.scss';

export const Home = () => {
  const [filteredEntries, setFilteredEntries] = React.useState<Entry[]>([]);

  const handleFilterChange = React.useCallback(async (filter: FilterType) => {
    const sortEntriesByDateAndTime = (e1: Entry, e2: Entry) => {
      const compareDate = e1.date.localeCompare(e2.date);
      if (compareDate === 0) {
        return e1.time.localeCompare(e2.time);
      }
      return compareDate;
    };

    setFilteredEntries(
      (await getFilteredEntries(filter)).sort(sortEntriesByDateAndTime)
    );
  }, []);

  return (
    <div className="App">
      <FilterPanel onFilterChange={handleFilterChange} />
      <div className="grid">
        <div className="col col-lg-12">
          <h2>Vorhandene online Aktivitäten ({filteredEntries.length})</h2>
        </div>
      </div>
      <div className="grid entries">
        {filteredEntries.map((entry, index) => (
          <div className="col col-lg-6" key={index}>
            <Card {...entry} />
          </div>
        ))}
      </div>
    </div>
  );
};
