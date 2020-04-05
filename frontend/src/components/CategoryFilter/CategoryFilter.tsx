import * as React from "react";
import "./CategoryFilter.scss";
import { Checkbox } from "../Checkbox/Checkbox";
import { RadioInput } from "../RadioInput/RadioInput";
import { Select, SelectOptionType } from "../Select/Select";
import { Category } from "../../models/Category";
import { getAllCategories } from "../../api/Category";
import { getAllAssociations } from "../../api/Association";
import { Association } from "../../models/Association";
import { TextInput } from "../TextInput/TextInput";

const defaultDates = [
  {id: "today", name: "Heute"},
  {id: "tomorrow", name: "Morgen"},
  {id: "week", name: "Nächste Woche"}
];

export type FilterType = {
  association: string;
  date: string;
  categories: Category[];
  community: string;
  location: string;
};

export interface ICategoryFilterProps {
  onFilterChange?: (filter: FilterType) => void;
}

export const CategoryFilter = ({onFilterChange}: ICategoryFilterProps) => {
  const [checkedDate, setDate] = React.useState(defaultDates[0].id);
  const [checkedCategories, setCheckedCategory] = React.useState<Category[]>(
    []
  );

  const [association, setAssociation] = React.useState("");
  const [associations, setAssociations] = React.useState<SelectOptionType[]>(
    []
  );

  const [community, setCommunity] = React.useState("");
  const [location, setLocation] = React.useState("");

  const handleCategoriesChange = (identifier: string, checked: boolean) => {
    setCheckedCategory(previousCheckedCategories =>
      previousCheckedCategories.map(category =>
        category.name === identifier
          ? {...category, checked}
          : {...category}
      )
    );
  };

  React.useEffect(() => {
    loadAssociations();
    loadCategories();
  }, []);

  const loadAssociations = async () => {
    setAssociations(
      (await getAllAssociations()).map((a: Association) => ({
        label: a.Name,
        value: a.Name.toLowerCase()
      }))
    );
  };

  const loadCategories = async () => {
    setCheckedCategory(
      (await getAllCategories()).map(category => ({
        name: category.name,
        checked: false,
        id: category.id
      }))
    );
  };

  React.useEffect(() => {
    onFilterChange &&
    onFilterChange({
      association,
      categories: checkedCategories,
      date: checkedDate,
      community: community,
      location: location,
    });
  }, [onFilterChange, association, checkedCategories, checkedDate, community, location]);

  return (
    <div className="category-filter grid">
      {/* 3 cols: 4 4 2 */}
      <div className="col col-lg-4 col-lg-offset-1">
        <TextInput
          value=""
          id="plz"
          label="Postleitzahl oder Ort"
          onTextChange={(e) => setLocation(e.target.value)}
        />
        <Select
          name="association"
          headline="Bistum oder Landeskirche"
          options={associations}
          value={association}
          onChangeSelect={setAssociation}
        />
      </div>
      <div className="col col-lg-4">
        <TextInput
          value={community}
          id="name"
          label="Gemeindename"
          onTextChange={(e) => setCommunity(e.target.value)}
        />
        <div className="filter__input">
          <label htmlFor="date">Datum</label>
          {defaultDates.map(({id, name}, index) => (
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
          {checkedCategories.map(({name, checked}, index) => (
            <Checkbox
              key={index}
              id={name}
              name={name}
              checked={checked ?? false}
              onCheckboxChange={handleCategoriesChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
