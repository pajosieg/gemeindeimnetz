import * as React from 'react';
import { Entry } from '../../models/Entry';
import { generateEntriesForSeries } from '../../utilities/DateUtilities';
import { Button } from '../Button/Button';
import { ButtonDefault } from '../Button/ButtonDefault';
import { Checkbox } from '../Checkbox/Checkbox';
import { Modal } from '../Modal/Modal';
import { RadioInput } from '../RadioInput/RadioInput';
import { DateInput } from '../TextInput/DateInput';
import { DateOrTimeInput } from '../TextInput/DateOrTimeInput';

export type SeriesDay = { label: string; checked: boolean };

const defaultSeriesDays: SeriesDay[] = [
  { label: 'Sonntag', checked: false },
  { label: 'Montag', checked: false },
  { label: 'Dienstag', checked: false },
  { label: 'Mittwoch', checked: false },
  { label: 'Donnerstag', checked: false },
  { label: 'Freitag', checked: false },
  { label: 'Samstag', checked: false },
];
type CopySingleEntry = { type: 'single'; date: string; time: string };

export type CopySeriesEntry = {
  type: 'series';
  startDate: string;
  endDate: string;
  seriesDays: SeriesDay[];
  time: string;
};

export type EntryCopyConfig = {
  entry?: Entry;
  copyType: CopySingleEntry | CopySeriesEntry;
};

interface IEntryCopierProps {
  entry: Entry;
  onClose: (entries: Entry[]) => void;
}

const EntryCopier: React.FunctionComponent<IEntryCopierProps> = ({
  entry,
  onClose,
}) => {
  const [copyType, setCopyType] = React.useState('single');
  const [date, setDate] = React.useState(entry.date);
  const [time, setTime] = React.useState(entry.time);
  const [startDate, setStartDate] = React.useState(entry.date);
  const [endDate, setEndDate] = React.useState(entry.date);
  const [seriesDays, setSeriesDays] = React.useState(defaultSeriesDays);

  const resetCopier = () => {
    setCopyType('single');
    setDate(entry.date);
    setTime(entry.time);
    setStartDate(entry.date);
    setEndDate(entry.date);
    setSeriesDays(defaultSeriesDays);
  };

  const createEntriesForSeries = () => {
    if (copyType === 'single') {
      const newEntry: Entry = { ...entry, id: -1, date, time };
      return [newEntry];
    } else if (copyType === 'series') {
      const seriesConfig: CopySeriesEntry = {
        type: 'series',
        startDate,
        time,
        endDate,
        seriesDays: [...seriesDays],
      };
      return generateEntriesForSeries(entry, seriesConfig);
    }
    return [];
  };

  const handleSave = () => {
    const entries = createEntriesForSeries();
    resetCopier();
    onClose(entries);
  };

  const handleCancel = () => {
    resetCopier();
    onClose([]);
  };

  const mapCheckedDayToSeriesDays = (dayIndex: string, state: boolean) => {
    setSeriesDays(prevSeriesDays => {
      prevSeriesDays[parseInt(dayIndex)].checked = state;
      return [...prevSeriesDays];
    });
  };

  return (
    <Modal onClose={handleCancel}>
      <div className="grid">
        <div className="col col-lg-12">
          <h2 className="margin-top-0">Kopieren: {entry.Title}</h2>
        </div>
      </div>
      <div className="grid margin-top-1_5em">
        <div className="col col-lg-4">
          <RadioInput
            name="entryType"
            id="single"
            label="Einzelaktivität"
            checked={'single' === copyType}
            onChangeRadioInput={setCopyType}
          />
        </div>
        <div className="col col-lg-4">
          <RadioInput
            name="entryType"
            id="series"
            label="Serienaktivität"
            checked={'series' === copyType}
            onChangeRadioInput={setCopyType}
          />
        </div>
      </div>
      {copyType === 'single' && (
        <div className="grid margin-top-1_5em">
          <div className="col col-lg-12">
            <DateInput
              className="margin-top-1em"
              labelDate="Datum"
              labelTime="Uhrzeit"
              onDateChange={setDate}
              onTimeChange={setTime}
              id="date"
              date={date}
              time={time}
            />
          </div>
        </div>
      )}
      {copyType === 'series' && (
        <>
          <div className="grid margin-top-1_5em">
            <div className="col col-lg-4">
              <DateOrTimeInput
                type="date"
                label={'Startdatum'}
                defaultValue={startDate}
                onChange={setStartDate}
              />
            </div>
            <div className="col col-lg-4">
              <DateOrTimeInput
                type="date"
                label={'Enddatum'}
                defaultValue={endDate}
                onChange={setEndDate}
              />
            </div>
            <div className="col col-lg-4">
              <DateOrTimeInput
                type="time"
                label={'Uhrzeit'}
                defaultValue={time}
                onChange={setTime}
              />
            </div>
          </div>
          <div className="grid margin-top-1_5em">
            <div className="col col-lg-12">
              <label htmlFor="activity" className="margin-top-1em">
                Tage Auswählen
              </label>
            </div>
            {seriesDays.map(({ label, checked }, index) => (
              <div className="col col-lg-3" key={index}>
                <Checkbox
                  name={label}
                  checked={checked}
                  id={index.toString()}
                  onCheckboxChange={mapCheckedDayToSeriesDays}
                />
              </div>
            ))}
          </div>
        </>
      )}
      <div className="grid margin-top-1_5em">
        <div className="col col-lg-12">
          <ButtonDefault onClick={handleCancel}>Abbrechen</ButtonDefault>
          <Button onClick={handleSave}>Speichern</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EntryCopier;
