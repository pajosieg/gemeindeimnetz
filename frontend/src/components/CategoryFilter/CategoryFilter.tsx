import * as React from "react";
import "./CategoryFilter.scss";

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
    return (
      <div className="category-filter grid">
        {/* 3 cols: 4 4 2 */}
        <div className="col col-lg-4 col-lg-offset-1">
          <div className="filter__input">
            <label htmlFor="plz">Postleitzahl oder Ort</label>
            <input type="text" id="plz" />
          </div>
          <div className="filter__input">
            <label htmlFor="association">Bistum oder Landeskirche</label>
            <select id="association">
              <option>Bistum Mainz</option>
              <option>Bistum Köln</option>
            </select>
          </div>
        </div>
        <div className="col col-lg-4">
          <div className="filter__input">
            <label htmlFor="name">Gemeindename</label>
            <input type="text" id="name" />
          </div>
          <div className="filter__input">
            <label htmlFor="date">Datum</label>
            <div className="input__radio"><input type="radio" name="date" id="today" /> <label htmlFor="today">Heute</label></div>
            <div className="input__radio"><input type="radio" name="date" id="tomorrow" /> <label htmlFor="tomorrow">Morgen</label></div>
            <div className="input__radio"><input type="radio" name="date" id="week" /> <label htmlFor="week">Nächste Woche</label></div>
          </div>
        </div>
        <div className="col col-lg-3">
          <div className="filter__input">
            <label htmlFor="activity">Aktivitäten</label>
            <div className="input__checkbox"><input type="checkbox" id="activity-1" value="Gottesdienst" /> <label htmlFor="activity-1">Gottesdienst</label></div>
            <div className="input__checkbox"><input type="checkbox" id="activity-2" value="Jugend" />  <label htmlFor="activity-2">Jugend</label></div>
            <div className="input__checkbox"><input type="checkbox" id="activity-3" value="Musik" />  <label htmlFor="activity-3">Musik</label></div>
            <div className="input__checkbox"><input type="checkbox" id="activity-4" value="Gebete" />  <label htmlFor="activity-4">Gebete</label></div>
            <div className="input__checkbox"><input type="checkbox" id="activity-5" value="Senioren" />  <label htmlFor="activity-5">Senioren</label></div>
            <div className="input__checkbox"><input type="checkbox" id="activity-6" value="Kurse" />  <label htmlFor="activity-6">Kurse</label></div>
          </div>
        </div>
      </div>
    );
  }
}
