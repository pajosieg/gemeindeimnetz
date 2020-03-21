import * as React from "react";
import { ReactComponent as GermanMapSVG } from "../../assets/german_map.svg";
import './GermanMap.scss';

export interface IGermanMapProps {}

export default class GermanMap extends React.Component<IGermanMapProps> {
  public render() {
    return (
      <div className="german-map">
        <h2>Wähle dein Bistun</h2>
        <GermanMapSVG />
      </div>
    );
  }
}
