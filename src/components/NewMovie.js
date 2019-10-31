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
import MovieService from '../services/MovieService';
import NewMovieButton from './commons/NewMovieButton';
import CustomModal from './commons/CustomModal';
import DatePicker from 'react-datepicker';

const initialValues={
  name: '',
  description: '',
  image_url: '',
  schedules_attributes: [],
}

class NewMovie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalMessage: ''
    } 
  }

  openModal(messageOptions){
    this.setState({
      modalMessage: messageOptions,
      showModal: true
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
                  this.openModal('La pelicula se guardó correctamente!');
                  resetForm(initialValues);
                },
                err => {
                  setSubmitting(false)
                
                  var message = '';
                  if(err.data.data.schedules.length > 0) {
                    message = 'Solo puede haber una funcion al dia por pelicula.'
                  } else {
                    message = 'Hubo un error al guardar la pelicula.'
                  }
                  this.openModal(message);
                  this.props.onSuccess();
                }
              )
          }}
        >
          {({ values, errors, isSubmitting, touched, setFieldValue, setFieldTouched }) => (
            <Form className="py-4">
              <Row>
                <Col md={12}>
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
               <FieldArray
                name="schedules_attributes"
                render={arrayHelpers => (
                  <div className="dates-selector">
                    <Row>
                      <Col lg="12" className="d-flex justify-content-between">
                        Fechas:
                        <Button color="link" onClick={() => arrayHelpers.push({ date: new Date() })}>
                          Nueva fecha
                        </Button>
                      </Col>
                    </Row>
                    {
                      Boolean(touched.schedules_attributes && errors.schedules_attributes) &&
                      <div className="invalid-feedback d-block">
                        {errors.schedules_attributes}
                      </div>
                    }
                    {values.schedules_attributes.map((schedules, index) => (
                      <div key={index} className="date d-flex justify-content-between mb-10">
                        <DatePicker 
                          selected={values.schedules_attributes[index].date}
                          dateFormat="MMMM d, yyyy"
                          className="form-control"
                          name={`schedules_attributes[${index}].date`}
                          onChange={date => setFieldValue(`schedules_attributes[${index}].date`, date)}
                          invalid={Boolean(touched.schedules_attributes && errors.schedules_attributes)}
                        />
                        <Button color="link" onClick={() => arrayHelpers.remove(index)}>
                          Quitar fecha
                        </Button>
                      </div>
                    ))}
                    
                  </div>
                )}
              />
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
            title='Crear pelicula'
            centered
          >
            <Row>
              <Col lg="12">
                {this.state.modalMessage}
              </Col>
            </Row>
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

NewMovie.propTypes = {
  onSuccess: PropTypes.func,
}

export default NewMovie;
