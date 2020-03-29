import * as React from 'react';
import "./Checkbox.scss";

interface CbState {
  value: string;
  checked: boolean;
}

interface CbProps {
  name: string;
  id: string;
}

export class Checkbox extends React.Component<CbProps> {
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
    this.setState({checked: event.target.checked});
  }

  public render() {
    return (
      <div className="input__checkbox">
        <input type="checkbox"
               id={this.props.id}
               name={this.props.name}
               checked={this.state.checked}
               onChange={this.handleChange}/>
        <label htmlFor={this.props.id}>{this.props.name}</label>
      </div>
    );
  }
}
