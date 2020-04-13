import * as React from 'react';
import { getFilteredEntries } from '../../api/Entry';
import { Entry, sortEntriesByDateAndTime } from '../../models/Entry';
import { Card } from '../Card/Card';
import { FilterPanel, FilterType } from '../FilterPanel/FilterPanel';
import './Home.scss';
import { Notification } from '../Notification/Notification';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [filteredEntries, setFilteredEntries] = React.useState<Entry[]>([]);

  const handleFilterChange = React.useCallback(async (filter: FilterType) => {
    setFilteredEntries(
      (await getFilteredEntries(filter)).sort(sortEntriesByDateAndTime)
    );
  }, []);

  return (
    <div className="App">
      <Notification>
        <p>
          Sie sind in Ihrer Gemeinde aktiv und möchten Ihre Inhalte hier
          präsentieren? Registrieren Sie sich und Ihre Gemeinde.
        </p>
        <Link to={'/community'} className="btn--inverted">
          Registrieren
        </Link>
      </Notification>
      <div className="grid">
        <div className="col col-lg-12">
          <div className="intro margin-top-2em">
            Finde das <strong>Online-Angebot Deiner Gemeinde</strong> oder stöbere in
            den Angeboten anderer Gemeinden.
            <br />
            <small>
              Filtere dabei nach <strong>Kategorien</strong> die Dich interessieren,
              nach <strong>Datum</strong> oder nach bestimmten{' '}
              <strong>Orten und Gemeinden</strong>.
            </small>
          </div>
        </div>
      </div>
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
