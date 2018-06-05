require("../modal.scss");

import React from "react";
import { render } from "react-dom";

import Modal from "../modal";

class Main extends React.Component {
  state = {
    modalVisible: false
  };

  componentDidMount() {
    this.setState({ button: this.button });
  }

  toggleModal = () => {
    console.log("click");
    this.setState(state => ({
      modalVisible: !state.modalVisible
    }));
  };

  onModalClose = () => {
    this.setState({ modalVisible: false });
    this.button.focus();
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleModal} ref={b => (this.button = b)}>
          Vis modal
        </button>

        <Modal
          buttonThatOpened={this.state.button}
          isVisible={this.state.modalVisible}
          onCloseClick={this.onModalClose}
        >
          <h2>Hallo</h2>
          <button>test</button>
        </Modal>
      </div>
    );
  }
}

window.onload = function() {
  render(<Main />, document.getElementById("app"));
};
