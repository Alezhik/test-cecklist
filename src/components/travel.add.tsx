import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import { TravelStore } from '../travel.store';

interface TodoAddProps {
  travelStore?: TravelStore
}

@inject('travelStore')
@observer
export class TravelAdd extends Component<TodoAddProps> {
  @observable private task: string = ''

  handleTaskChange = ({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => {
    this.task = value;
  };

  handleAddTravel = () => {
    this.props.travelStore!.addTravel(this.task);
    this.task = '';
  };

  render() {
    return (
      <div>
        <label>New Task</label>
        <input value={this.task} onChange={this.handleTaskChange} />
        <button onClick={this.handleAddTravel}>Add</button>
      </div>
    );
  }
};
