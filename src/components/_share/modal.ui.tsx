import React from 'react';
import { observer, inject } from 'mobx-react';

import { MessageStore } from '../../stores/message.store';

interface ModalUi {
  messageStore?: MessageStore
};

const ChildComponent = ({ messageStore }: ModalUi) => {

  const handleAddMessage = () => {
    messageStore!.addMessage({ message: "", show: false });
  };

  if (messageStore!.message.show) {
    return (
      <div className="modal">
        <div>
          {messageStore!.message.message}
        </div>
        <button onClick={handleAddMessage}>Ok</button>
      </div>
    );
  }
  return null
}

export const Child = inject('messageStore')(observer(ChildComponent));
