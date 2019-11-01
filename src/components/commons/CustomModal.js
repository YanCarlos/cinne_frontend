import React from 'react';
import PropTypes from 'prop-types';
import { 
  Modal, 
  ModalHeader, 
  ModalBody} from 'reactstrap';


class CustomModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.show} toggle={this.props.toggle} centered={this.props.centered} size={this.props.size}>
        <ModalHeader toggle={this.props.toggle}>{this.props.title} </ModalHeader>
        <ModalBody>
          {this.props.children}
        </ModalBody>
      </Modal>
    );
  }
}


CustomModal.propTypes = {
  show: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
  centered: PropTypes.bool,
  size: PropTypes.string
};

export default CustomModal;
