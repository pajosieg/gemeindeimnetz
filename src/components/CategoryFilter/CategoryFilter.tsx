import * as React from "react";

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
            <div className="input__radio"><input type="radio" id="date" /> <span>Heute</span></div>
            <div className="input__radio"><input type="radio" id="date" /> <span>Morgen</span></div>
            <div className="input__radio"><input type="radio" id="date" /> <span>Nächste Woche</span></div>
          </div>
        </div>
        <div className="col col-lg-2">
          <div className="filter__input">
            <label htmlFor="activity">Aktivitäten</label>
            <div className="input__checkbox"><input type="checkbox" id="activity" /> <span>Gottesdienst</span></div>
            <div className="input__checkbox"><input type="checkbox" id="activity" /> <span>Jugend</span></div>
            <div className="input__checkbox"><input type="checkbox" id="activity" /> <span>Musik</span></div>
            <div className="input__checkbox"><input type="checkbox" id="activity" /> <span>Gebete</span></div>
            <div className="input__checkbox"><input type="checkbox" id="activity" /> <span>Senioren</span></div>
            <div className="input__checkbox"><input type="checkbox" id="activity" /> <span>Kurse</span></div>
          </div>
        </div>
      </div>
    );
  }
}
