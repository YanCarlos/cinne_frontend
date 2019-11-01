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
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { FormValidator } from '../helpers/form_validator';
import MovieService from '../../../services/MovieService';
import NewMovieButton from '../../commons/NewMovieButton';
import CustomModal from '../../commons/CustomModal';
import DatePicker from 'react-datepicker';
import errorsHandler from '../../../helpers/errors_handler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const initialValues={
  name: '',
  description: '',
  image_url: '',
  schedules_attributes: [ { 'date': new Date() }],
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

            MovieService.create(values)
              .then(
                () => {
                  setSubmitting(false);
                  this.openModal('La pelicula se guardó correctamente!', 'Pelicula guardada');
                  resetForm(initialValues);
                  this.props.onSuccess();
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
                    <Label for="name" className="font-weight-bold">Nombre: *</Label>
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
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="description" className="font-weight-bold">Descripción: *</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      tag={Field}
                      invalid={Boolean(touched.description && errors.description)}
                      aria-required
                      component='textarea'
                    />
                    <ErrorMessage name="description" component={FormFeedback} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="image_url" className="font-weight-bold">Url de la imagen: </Label>
                    <Input
                      type="text"
                      name="image_url"
                      id="image_url"
                      tag={Field}
                      invalid={Boolean(touched.image_url && errors.image_url)}
                      aria-required
                    />
                    <ErrorMessage name="image_url" component={FormFeedback} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  {
                    Boolean(touched.schedules_attributes && errors.schedules_attributes) &&
                    <div className="invalid-feedback d-block">
                      {errors.schedules_attributes}
                    </div>
                  }
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="schedules_attributes" className="font-weight-bold">Fechas: </Label>
                    <FieldArray
                      name="schedules_attributes"
                      render={arrayHelpers => (
                        <div className="dates-selector">
                          {values.schedules_attributes.map((schedules, index) => (
                            <div key={index} className="date d-flex justify-content-start align-items-center mb-10">
                              <div>
                                <DatePicker 
                                  selected={values.schedules_attributes[index].date}
                                  dateFormat="MMMM d, yyyy"
                                  className="form-control"
                                  name={`schedules_attributes[${index}].date`}
                                  onChange={date => setFieldValue(`schedules_attributes[${index}].date`, date)}
                                  invalid={Boolean(touched.schedules_attributes && errors.schedules_attributes)}
                                />
                              </div>
                              <Button className="round-button danger" onClick={() => arrayHelpers.remove(index)}>
                                <FontAwesomeIcon icon={faMinus} className="icon"/>
                              </Button>
                              <Button className="round-button success" onClick={() => arrayHelpers.push({ date: new Date() })}>
                                <FontAwesomeIcon icon={faPlus} className="icon"/>
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <NewMovieButton disabled={isSubmitting}/>  
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
  onSuccess: PropTypes.func,
}

export default CreateMovie;
