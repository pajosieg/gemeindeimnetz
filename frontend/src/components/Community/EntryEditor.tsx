import * as React from 'react';
import { TextInput } from '../TextInput/TextInput';
import { TextArea } from '../TextInput/TextArea';
import { DateInput } from '../TextInput/DateInput';
import { Entry } from '../../models/Entry';
import { Select } from '../Select/Select';
import { getAllCategories } from '../../api/Category';
import { Category } from '../../models/Category';
import { Button } from '../Button/Button';
import { ButtonDefault } from '../Button/ButtonDefault';
import './EntryEditor.scss';

type EntryEditorProps = {
  entry: Entry;
  onSave: (entry: Entry) => void;
  onCancel: () => void;
};

export const EntryEditor = ({ entry, onSave, onCancel }: EntryEditorProps) => {
  const [date, setDate] = React.useState(entry.date);
  const [time, setTime] = React.useState(entry.time);
  const [title, setTitle] = React.useState(entry.Title);
  const [description, setDescription] = React.useState(entry.Description);
  const [selectedCategory, selectCategory] = React.useState(entry.categoryId || -1);
  const [link, setLink] = React.useState(entry.Link);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const handleDateChange = React.useCallback((date: string) => {
    setDate(date);
  }, []);

  const handleTimeChange = React.useCallback((time: string) => {
    setTime(time);
  }, []);

  React.useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleCreateEntry = () => {
    onSave({
      ...entry,
      categoryId: selectedCategory,
      Link: link,
      Description: description,
      Title: title,
      date,
      time,
    });
  };

  return (
    <>
      <h2 className="margin-top-0">
        {entry.id === -1 ? 'Aktivität anlegen' : 'Aktivität bearbeiten'}
      </h2>
      <div className="margin-top-1_5em">
        <TextInput
          className="margin-top-1em"
          label="Titel"
          onTextChange={e => setTitle(e.target.value)}
          id="title"
          value={title}
        />
        <TextInput
          className="margin-top-1em"
          label="Link"
          onTextChange={e => setLink(e.target.value)}
          id="link"
          placeholder="https://www.youtube.com/xy1a23bc"
          value={link}
        />
        <TextArea
          className="margin-top-1em"
          label="Beschreibung"
          onTextChange={e => setDescription(e.target.value)}
          id="title"
          value={description}
        />
        <Select
          className="margin-top-1em"
          name="category"
          headline="Kategorie"
          options={categories.map(c => ({
            value: c.id.toString() ?? '-1',
            label: c.name,
          }))}
          value={selectedCategory < 0 ? '' : selectedCategory.toString()}
          onChangeSelect={value => selectCategory(parseInt(value))}
        />
        <DateInput
          className="margin-top-1em"
          labelDate="Datum"
          labelTime="Uhrzeit"
          onDateChange={handleDateChange}
          onTimeChange={handleTimeChange}
          id="date"
          date={date}
          time={time}
        />
      </div>
      <div className="form-footer margin-top-1_5em">
        <ButtonDefault onClick={onCancel}>Abbrechen</ButtonDefault>
        <Button onClick={handleCreateEntry}>Speichern</Button>
      </div>
    </>
  );
};
