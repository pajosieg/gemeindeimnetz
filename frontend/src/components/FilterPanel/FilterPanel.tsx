import * as React from 'react';
import { getAllAssociations } from '../../api/Association';
import { getAllCategories } from '../../api/Category';
import { getCommunitiesForAssociation } from '../../api/Community';
import { Association } from '../../models/Association';
import { Category } from '../../models/Category';
import { Community } from '../../models/Community';
import { Checkbox } from '../Checkbox/Checkbox';
import { RadioInput } from '../RadioInput/RadioInput';
import { Select, SelectOptionType } from '../Select/Select';
import { NumberInput } from '../TextInput/NumberInput';
import './FilterPanel.scss';
import { getISODate } from '../../utilities/DateUtilities';

const defaultDates = [
  { id: 'all', name: 'Alle' },
  { id: 'today', name: 'Heute' },
  { id: 'tomorrow', name: 'Morgen' },
  { id: 'week', name: 'Diese Woche' },
];

const getDateMapping = (value: string) => {
  const getISODay = (delay: number) => {
    const day = new Date(Date.now() + delay * 24 * 60 * 60 * 1000);
    return getISODate(day);
  };

  const todayISO = getISODay(0);
  const tomorrowISO = getISODay(1);

  switch (value) {
    case 'today':
      return [todayISO];
    case 'tomorrow':
      return [tomorrowISO];
    case 'week':
      return [...new Array(7 + 1)].map((_, i) => getISODay(i));

    default:
      return [];
  }
};

export type FilterType = {
  association: number;
  community: number;
  date: string[];
  categories: Category[];
  location: number;
};

export interface IFilterPanelProps {
  onFilterChange: (filter: FilterType) => void;
}

export const FilterPanel = ({ onFilterChange }: IFilterPanelProps) => {
  const [communities, setCommunities] = React.useState<SelectOptionType[]>([]);
  const [associations, setAssociations] = React.useState<SelectOptionType[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const [selectedAssociation, selectAssociation] = React.useState(-1);
  const [selectedCommunity, selectCommunity] = React.useState(-1);
  const [selectedDate, selectDate] = React.useState(defaultDates[0].id);
  const [location, setLocation] = React.useState(-1);

  const handleCategoriesChange = (identifier: string, checked: boolean) => {
    setCategories(previousCheckedCategories =>
      previousCheckedCategories.map(category =>
        category.name === identifier ? { ...category, checked } : { ...category }
      )
    );
  };

  React.useEffect(() => {
    loadAssociations();
    loadCategories();
  }, []);

  const loadAssociations = async () => {
    setAssociations(
      [{ label: 'Alle anzeigen', value: '-1' }].concat(
        (await getAllAssociations()).map((a: Association) => ({
          label: a.Name,
          value: a.id.toString(),
        }))
      )
    );
  };

  const loadCommunities = React.useCallback(async () => {
    selectCommunity(-1);
    setCommunities(
      [{ label: 'Alle anzeigen', value: '-1' }].concat(
        (await getCommunitiesForAssociation(selectedAssociation)).map(
          (c: Community) => ({
            label: c.Name,
            value: c.id.toString(),
          })
        )
      )
    );
  }, [selectedAssociation]);

  React.useEffect(() => {
    loadCommunities();
  }, [selectedAssociation, loadCommunities]);

  const loadCategories = async () => {
    setCategories(
      (await getAllCategories()).map(category => ({
        name: category.name,
        checked: false,
        id: category.id,
      }))
    );
  };

  React.useEffect(() => {
    onFilterChange({
      association: selectedAssociation,
      categories: categories.filter(c => c.checked),
      community: selectedCommunity,
      location,
      date: getDateMapping(selectedDate),
    });
  }, [
    onFilterChange,
    selectedAssociation,
    categories,
    selectedDate,
    selectedCommunity,
    location,
  ]);

  return (
    <div className="category-filter grid">
      {/* 3 cols: 4 4 2 */}
      <div className="col col-lg-4 col-lg-offset-1">
        <Select
          name="association"
          headline="Bistum oder Landeskirche"
          options={associations}
          value={selectedAssociation === -1 ? '-1' : selectedAssociation.toString()}
          onChangeSelect={v => selectAssociation(parseInt(v))}
        />
        <Select
          name="community"
          headline="Gemeinde"
          options={communities}
          value={selectedCommunity === -1 ? '-1' : selectedCommunity.toString()}
          onChangeSelect={v => selectCommunity(parseInt(v))}
        />
        <NumberInput
          defaultValue={location >= 0 ? location.toString() : ''}
          id="plz"
          label="Postleitzahl"
          onBlur={e => setLocation(e.target.valueAsNumber)}
        />
      </div>
      <div className="col col-lg-4">
        <div className="filter__input">
          <label htmlFor="date">Datum</label>
          {defaultDates.map(({ id, name }, index) => (
            <RadioInput
              key={index}
              name="date"
              id={id}
              label={name}
              checked={selectedDate === id}
              onChangeRadioInput={selectDate}
            />
          ))}
        </div>
      </div>
      <div className="col col-lg-3">
        <div className="filter__input">
          <label htmlFor="activity">Aktivitäten</label>
          {categories.map(({ name, checked }, index) => (
            <Checkbox
              key={index}
              id={name}
              name={name}
              checked={checked ?? false}
              onCheckboxChange={handleCategoriesChange}
              showIcon={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
