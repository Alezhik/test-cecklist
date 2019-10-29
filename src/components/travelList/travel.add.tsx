import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import { TravelStore } from '../../stores/travel.store';

interface TodoAddProps {
  travelStore?: TravelStore
}

@inject('travelStore')
@observer
export class TravelAdd extends Component<TodoAddProps> {
  @observable private thingNmae: string = ''

  handleThingChange = ({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => {
    this.thingNmae = value;
  };

  handleAddTravel = () => {
    this.props.travelStore!.addTravel(this.thingNmae);
    this.thingNmae = '';
  };

  render() {
    return (
      <div>
        <label>Add new thing</label>
        <input value={this.thingNmae} onChange={this.handleThingChange} />
        <button onClick={this.handleAddTravel}>Add</button>
      </div>
    );
  }
};
