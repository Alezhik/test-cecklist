
import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import { TravelList } from './components/travelList/travel.list';
import Modal from './components/_share/modal';
import { Child } from './components/_share/modal.ui';
import { RootStore } from './stores';

export default class App extends Component {
  private rootStore: RootStore = new RootStore();

  render() {
    return (
      <Provider
        rootStore={this.rootStore}
        travelStore={this.rootStore.travelStore}
        messageStore={this.rootStore.messageStore}
        thingStore={this.rootStore.thingStore}
      >
        <TravelList />
        <Modal>
          <Child/>
        </Modal>
      </Provider>
    );
  }
};
