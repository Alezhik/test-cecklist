import { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';

export default class Modal extends Component {
  @observable private el: HTMLElement = document.createElement('div');
  @observable private modalRoot: HTMLElement | null = document.getElementById('modal-root');

  componentDidMount() {
    this.modalRoot!.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot!.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}
