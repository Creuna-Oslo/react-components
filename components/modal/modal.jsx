import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import cn from "classnames";

import TabTrapper from "./tab-trapper";

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isVisible: PropTypes.bool,
    hide: PropTypes.func.isRequired // will be triggered by click on the modal background or by pressing the esc key
  };

  state = {
    fitsOnScreen: false,
    contentHeight: 0
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleEscPress);

    this.setState({
      fitsOnScreen: this.modal.scrollHeight <= window.innerHeight
    });
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscPress);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isVisible !== prevProps.isVisible && this.props.isVisible) {
      this.onAfterShowModal();
    }
  }

  onAfterShowModal = () => {
    // Wait one frame before focusing
    requestAnimationFrame(() => {
      this.modal.focus();
      this.modal.scrollTop = 0;
    });

    this.setState(
      {
        fitsOnScreen: this.modal.scrollHeight <= window.innerHeight
      },
      () => {
        this.setState({ contentHeight: this.modal.scrollHeight });
      }
    );
  };

  handleEscPress = e => {
    if (e.which === 27) {
      this.props.hide();
    }
  };

  render() {
    const ariaProps = { "aria-modal": true, role: "dialog" };
    const bodyElement = typeof document !== "undefined" && document.body;
    return !bodyElement
      ? null
      : ReactDOM.createPortal(
          <div
            className={cn("modal", {
              "is-visible": this.props.isVisible,
              "fits-on-screen": this.state.fitsOnScreen
            })}
            ref={div => (this.modal = div)}
            tabIndex={-1}
            {...ariaProps}
          >
            <div
              className="modal-background"
              style={{
                minHeight: this.state.contentHeight
              }}
              onClick={this.props.hide}
            />

            <TabTrapper isActive={this.props.isVisible}>
              {this.props.children}
            </TabTrapper>
          </div>,
          bodyElement
        );
  }
}

export default Modal;
