import { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import { TravelStore } from '../../stores/travel.store';

interface ModalProps { 
  travelStore?: TravelStore
};

@inject('travelStore')
@observer
export default class Modal extends Component<ModalProps> {
  @observable private el: HTMLElement = document.createElement('div');
  @observable private modalRoot: HTMLElement | null = document.getElementById('modal-root');

  componentDidMount() {
    this.modalRoot!.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot!.removeChild(this.el);
  }

  render() {
    console.log('Modal', this.props.travelStore);
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}
