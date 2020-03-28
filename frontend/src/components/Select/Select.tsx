import * as React from 'react';
import "./Select.scss";

interface CbState {
  value: string;
  checked: boolean;
}

interface CbProps {
  name: string;
  headline: string;
  options: string[];
}

export class Select extends React.Component<CbProps> {
  state: CbState;

  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
      checked: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    this.setState({value: event.target.value});
  }

  public render() {
    const items = [];

    items.push(<option value="">Bitte wählen</option>);

    for (const value of this.props.options) {
      items.push(<option value={value}>{value}</option>);
    }

    return (
      <div className="select-wrapper">
        <label htmlFor={this.props.name}>{this.props.headline}</label>
        <select id={this.props.name} value={this.state.value} onChange={this.handleChange}>
          {items}
        </select>
      </div>

    );
  }
}
