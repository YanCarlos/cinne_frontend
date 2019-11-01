import React from 'react';
import PropTypes from 'prop-types';
import {
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row
} from 'reactstrap';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { FormValidator } from '../helpers/form_validator';
import BookingService from '../../../services/BookingService';
import CustomModal from '../../commons/CustomModal';
import errorsHandler from '../../../helpers/errors_handler';

const initialValues={
  name: '',
  identification: '',
  phone: '',
  email: ''
}

class CreateMovie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalMessage: '',
      modalTitle: ''
    } 
  }

  openModal(messageOptions, title){
    this.setState({
      modalMessage: messageOptions,
      showModal: true,
      modalTitle: title,
    })
  }

  render() {
    return(
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={FormValidator}
          onSubmit={(values, { setSubmitting, resetForm }) => {

            BookingService.create(values, this.props.schedule_id)
              .then(
                () => {
                  setSubmitting(false);
                  this.openModal('La reserva fue generada correctamente', 'Reserva realizada');
                  resetForm(initialValues);
                },
                err => {
                  setSubmitting(false)
                  this.openModal(errorsHandler(err.data.message), 'Error');
                }
              )
          }}
        >
          {({ values, errors, isSubmitting, touched, setFieldValue, setFieldTouched }) => (
            <Form className="py-4">
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="name" className="font-weight-bold">Nombre</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      tag={Field}
                      invalid={Boolean(touched.name && errors.name)}
                      aria-required
                    />
                    <ErrorMessage name="name" component={FormFeedback} />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="phone" className="font-weight-bold">Celular</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      tag={Field}
                      invalid={Boolean(touched.phone && errors.phone)}
                      aria-required
                    />
                    <ErrorMessage name="phone" component={FormFeedback} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="identification" className="font-weight-bold">Cedula </Label>
                    <Input
                      type="text"
                      name="identification"
                      id="identification"
                      tag={Field}
                      invalid={Boolean(touched.identification && errors.identification)}
                      aria-required
                    />
                    <ErrorMessage name="identification" component={FormFeedback} />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="email" className="font-weight-bold">Correo electronico </Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      tag={Field}
                      invalid={Boolean(touched.email && errors.email)}
                      aria-required
                    />
                    <ErrorMessage name="email" component={FormFeedback} />
                  </FormGroup>
                </Col>
              </Row>
              <div className="d-flex justify-content-end  mt-10">
                <Button 
                  color="primary"
                  disabled={isSubmitting}>
                  Reservar ahora
                </Button> 
              </div>
            </Form>
          )}
        </Formik>
        { this.state.showModal &&
          <CustomModal 
            show={this.state.showModal}
            toggle={() => this.setState({ showModal: false })}
            title={this.state.modalTitle}
            centered
          >
            <Row>
              <Col lg="12">
                {this.state.modalMessage}
              </Col>
            </Row>
            <br/>
            <Row>
              <Col lg="12" className="d-flex justify-content-end">
                <Button color="primary" onClick={() => this.setState({ showModal: false })}>
                  Aceptar
                </Button>
              </Col>
            </Row>
          </CustomModal>
        }
      </div>
    )
  }
}

CreateMovie.propTypes = {
  schedule_id: PropTypes.number,
}

export default CreateMovie;
