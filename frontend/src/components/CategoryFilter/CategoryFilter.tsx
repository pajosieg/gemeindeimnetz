import * as React from "react";
import "./CategoryFilter.scss";
import { Checkbox } from "../Checkbox/Checkbox";
import { RadioInput } from "../RadioInput/RadioInput";
import { Select } from "../Select/Select";

const associations = [
  { label: "Bistum Mainz", value: "bistumMainz" },
  { label: "Bistum Köln", value: "bistumKoeln" },
  { label: "Hessen-Nassau", value: "hessenNassau" }
];

const defaultDates = [
  { id: "today", name: "Heute" },
  { id: "tomorrow", name: "Morgen" },
  { id: "week", name: "Nächste Woche" }
];

type Category = {
  name: string;
  checked?: boolean;
};

const categories: Category[] = [
  { name: "Gottesdienst" },
  { name: "Jugend" },
  { name: "Musik" },
  { name: "Gebet" },
  { name: "Senioren" },
  { name: "Kurs" }
];

export type CategoryFilterType = {
  association: string;
  date: string;
  categories: Category[];
};

export interface ICategoryFilterProps {
  onFilterChange?: (filter: CategoryFilterType) => void;
}

export const CategoryFilter = ({ onFilterChange }: ICategoryFilterProps) => {
  const [checkedDate, setDate] = React.useState(defaultDates[0].id);
  const [checkedCategories, setCheckedCategory] = React.useState<Category[]>(
    categories
  );
  const [association, setAssociation] = React.useState("");

  const setCategory = (identifier: string, checked: boolean) => {
    const newCategories = checkedCategories.map(category =>
      category.name === identifier ? { ...category, checked } : { ...category }
    );

    setCheckedCategory(newCategories);
  };

  const getCategory = (cName: string) => {
    return checkedCategories.some(
      ({ name, checked }) => name === cName && checked
    );
  };

  React.useEffect(() => {
    onFilterChange &&
      onFilterChange({
        association,
        categories: checkedCategories,
        date: checkedDate
      });
  }, [association, checkedCategories, checkedDate]);

  return (
    <div className="category-filter grid">
      {/* 3 cols: 4 4 2 */}
      <div className="col col-lg-4 col-lg-offset-1">
        <div className="filter__input">
          <label htmlFor="plz">Postleitzahl oder Ort</label>
          <input type="text" id="plz" />
        </div>
        <Select
          name="association"
          headline="Bistum oder Landeskirche"
          options={associations}
          value={association}
          onChangeSelect={setAssociation}
        />
      </div>
      <div className="col col-lg-4">
        <div className="filter__input">
          <label htmlFor="name">Gemeindename</label>
          <input type="text" id="name" />
        </div>
        <div className="filter__input">
          <label htmlFor="date">Datum</label>
          {defaultDates.map(({ id, name }, index) => (
            <RadioInput
              key={index}
              name="date"
              id={id}
              label={name}
              checked={checkedDate === id}
              onChangeRadioInput={setDate}
            />
          ))}
        </div>
      </div>
      <div className="col col-lg-3">
        <div className="filter__input">
          <label htmlFor="activity">Aktivitäten</label>
          {categories.map(({ name }, index) => (
            <Checkbox
              key={index}
              id={name}
              name={name}
              checked={getCategory(name)}
              onCheckboxChange={setCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
