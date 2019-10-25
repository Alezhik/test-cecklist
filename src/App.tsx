
import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import { TravelStore } from './travel.store';
import { TravelAdd } from './components/travel.add';
import { TravelList } from './components/travel.list';

export default class App extends Component {
  private travelStore: TravelStore = new TravelStore();

  render() {
    return (
      <Provider travelStore={this.travelStore}>
        <div>
          <TravelAdd />
          <TravelList />
        </div>
      </Provider>
    );
  }
};
