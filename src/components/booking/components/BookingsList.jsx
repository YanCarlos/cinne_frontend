import React  from 'react';
import BookingService from '../../../services/BookingService';
import { Row, Col, Container } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { Table } from 'reactstrap';

class BookingsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
      loading: true,
      startDate: new Date()
    }
  }

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings(date) {
    this.setState({ 
      loading: true,
      bookings: []
    })
    BookingService.all(date)
      .then(result => { 
        this.setState({ 
          bookings: result['data'],
          loading: false
        })
      }) 
      .catch(err => {
        console.log("error: ", err)
      });
  }
  
  renderLoader() {
    if(this.state.loading) {
      return(
        <div className="loader"></div>
      );
    }
  }

  render() {
    return(
      <Container fluid={true} className="bookings">
        <Row>
          <Col sm="6" xs="12">
            <h2>Reservas</h2>
          </Col>
        </Row>
      
        <div className="list">
          <Row>
            <Col lg="4" >
              Seleccionar Fecha
              <DatePicker
                showPopperArrow={false}
                selected={this.state.startDate}
                onChange={date => { 
                  this.fetchBookings(date)
                  this.setState({ startDate: date })
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="12" className="d-flex justify-content-center mb-10">
              {this.renderLoader()}
            </Col>
          </Row>
          <Row>
            {
              this.state.bookings.length ? (
                <Table responsive={true} className="bookings-table">
                  <thead>
                    <tr>
                      <th>Pelicula</th>
                      <th>Comprador</th>
                      <th>Email</th>
                      <th>Cedula</th>
                      <th>Celular</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.bookings.map(booking => (
                        <tr key={booking.id}>
                          <td>{booking.movie_name}</td>
                          <td>{booking.name}</td>
                          <td>{booking.email}</td>
                          <td>{booking.identification}</td>
                          <td>{booking.phone}</td>
                        </tr>

                      ))
                    }
                  </tbody>
                </Table>
              ) : (
                <Col lg="12" className="d-flex justify-content-center">
                  <div>No hay Reservas para listar</div>   
                </Col>
              )
            }
          </Row>
        </div>
      </Container>
    )
  }
}

export default BookingsList;
