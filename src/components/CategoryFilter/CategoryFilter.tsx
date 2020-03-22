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
      <div className="category-filter">
        <label htmlFor="city">Ort/Stadt</label>
        <select id="city">
          <option>Mainz</option>
          <option>Ingelheim</option>
        </select>

        <label htmlFor="category">Kategorie</label>
        <select id="category">
          <option>GoDi</option>
          <option>Musik</option>
        </select>
      </div>
    );
  }
}
