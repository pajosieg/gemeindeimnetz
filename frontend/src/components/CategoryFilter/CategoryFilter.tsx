import * as React from "react";
import "./CategoryFilter.scss";
import { Checkbox } from '../Checkbox/Checkbox';
import { RadioInput } from '../RadioInput/RadioInput';
import { Select } from '../Select/Select';

export interface ICategoryFilterProps {}

export interface ICategoryFilterState {}

export class CategoryFilter extends React.Component<
  ICategoryFilterProps,
  ICategoryFilterState
> {
  constructor(props: ICategoryFilterProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const bistumLandeskirche = [
      "Bistum Mainz",
      "Bistum Köln",
      "Hessen-Nassau"
    ];

    return (
      <div className="category-filter grid">
        {/* 3 cols: 4 4 2 */}
        <div className="col col-lg-4 col-lg-offset-1">
          <div className="filter__input">
            <label htmlFor="plz">Postleitzahl oder Ort</label>
            <input type="text" id="plz" />
          </div>
          <Select name="association" headline="Bistum oder Landeskirche" options={bistumLandeskirche} />
        </div>
        <div className="col col-lg-4">
          <div className="filter__input">
            <label htmlFor="name">Gemeindename</label>
            <input type="text" id="name" />
          </div>
          <div className="filter__input">
            <label htmlFor="date">Datum</label>
            <RadioInput name="date" id="today" label="Heute"/>
            <RadioInput name="date" id="tomorrow" label="Morgen"/>
            <RadioInput name="date" id="week" label="Nächste Woche"/>
          </div>
        </div>
        <div className="col col-lg-3">
          <div className="filter__input">
            <label htmlFor="activity">Aktivitäten</label>
            <Checkbox id="activity-1" name="Gottesdienst" />
            <Checkbox id="activity-2" name="Jugend" />
            <Checkbox id="activity-3" name="Musik" />
            <Checkbox id="activity-4" name="Gebete" />
            <Checkbox id="activity-5" name="Senioren" />
            <Checkbox id="activity-6" name="Kurse" />
          </div>
        </div>
      </div>
    );
  }
}
