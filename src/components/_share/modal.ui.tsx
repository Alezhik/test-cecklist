import React from 'react';
import { observer, inject } from 'mobx-react';

import { TravelStore } from '../../travel.store';

interface ModalUi {
  travelStore?: TravelStore
};

const ChildComponent = ({ travelStore }: ModalUi) => {

  console.log('Child travelStore', travelStore!.message.show);

  const handleAddMessage = () => {
    travelStore!.addMessage({ message: "", show: false });
  };

  if (travelStore!.message.show) {
    console.log('RENDER must be there');
    return (
      <div className="modal">
        {console.log('travelStore', travelStore)}
        <div>
          {travelStore!.message.message}
        </div>
        <button onClick={handleAddMessage}>Ok</button>
      </div>
    );
  }
  return null
}

export const Child = inject('travelStore')(observer(ChildComponent));
