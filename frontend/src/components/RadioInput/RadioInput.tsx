import * as React from 'react';
import "./RadioInput.scss";

interface RIState {
  value: string;
  checked: boolean;
}

interface RIProps {
  name: string;
  id: string;
  label: string;
}

export class RadioInput extends React.Component<RIProps> {
  state: RIState;

  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
      checked: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange(event: any) {
    this.setState({checked: event.target.checked});
  }

  public render() {
    return (
      <div className="input__radio">
        <input type="radio"
               name={this.props.name}
               id={this.props.id}
               checked={this.state.checked}
               onChange={this.handleChange} />
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
  }
}
