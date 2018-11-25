// Modal
import React from "react";
import Layout from "../../layout";

import Modal from "components/modal";
require("components/modal/modal.scss");

const modalStyle = {
  position: "relative",
  backgroundColor: "white",
  width: "90%",
  maxWidth: 600,
  margin: "0 auto"
};

class ModalPage extends React.Component {
  state = {
    modalVisible: false
  };

  toggleModal = () => {
    this.setState(state => ({
      modalVisible: !state.modalVisible
    }));
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    return (
      <Layout>
        <div>
          <button onClick={this.toggleModal}>Vis modal</button>

          <Modal hide={this.hideModal} isVisible={this.state.modalVisible}>
            <div style={modalStyle}>
              <h2>Hallo</h2>
              <button onClick={this.hideModal}>Lukk</button>
            </div>
          </Modal>
        </div>
      </Layout>
    );
  }
}

export default ModalPage;
