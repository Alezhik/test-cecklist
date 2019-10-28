
import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import { TravelStore } from './stores/travel.store';
import { TravelAdd } from './components/travel.add';
import { TravelList } from './components/travel.list';
import Modal from './components/_share/modal';
import { Child } from './components/_share/modal.ui';

export default class App extends Component {
  private travelStore: TravelStore = new TravelStore();

  render() {
    console.log('this.travelStore', this.travelStore);
    return (
      <Provider travelStore={this.travelStore}>
        <div>
          <TravelAdd />
          <TravelList />
        </div>
        <Modal>
          <Child/>
        </Modal>
      </Provider>
    );
  }
};
