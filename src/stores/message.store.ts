import { observable, action } from 'mobx';

export interface Message {
  message: string
  show: boolean
};

export class MessageStore {
  @observable message: Message = { message: "", show: false };

  @action
  addMessage(message: Message) {
    this.message.message = message.message;
    this.message.show = message.show;
    return message;
  }
}

export const messageStore = new MessageStore();
