// Modal
import React from "react";
import Layout from "../../layout";

import Modal from "components/modal";
require("components/modal/modal.scss");

class ModalPage extends React.Component {
  state = {
    modalVisible: false
  };

  componentDidMount() {
    this.setState({ button: this.button });
  }

  toggleModal = () => {
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
      <Layout>
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
      </Layout>
    );
  }
}

export default ModalPage;
