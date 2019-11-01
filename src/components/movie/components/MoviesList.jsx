import React  from 'react';
import MovieService from '../../../services/MovieService';
import Movie from './Movie';
import { Row, Col, Container } from 'reactstrap';
import DatePicker from 'react-datepicker';
import CustomModal from '../../commons/CustomModal';
import NewMovieButton from '../../commons/NewMovieButton';
import CreateMovie from './CreateMovie';

class MoviesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: true,
      startDate: new Date(),
      newMovie: false
    }
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies(date) {
    this.setState({ 
      loading: true,
      movies: []
    })
    MovieService.all(date)
      .then(result => { 
        this.setState({ 
          movies: result['data'],
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

  newMovie() {
    this.setState({ newMovie: true })
  }

  render() {
    return(
      <Container fluid={true} className="movies">
        <Row className="title-container">
          <Col sm="6" xs="12" className="column">
            <h2>Peliculas</h2>
          </Col>
          <Col sm="6" xs="12" className="d-flex justify-content-end column">
            <NewMovieButton onclick={() => this.newMovie()}/>
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
                  this.fetchMovies(date)
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
              this.state.movies.length ? (
              this.state.movies.map(movie => (
                <Col lg="3" sm="6"className="column" key={movie.id}>
                  <Movie
                    name={movie.name}
                    image_url={movie.image_url} 
                    can_booking={movie.can_booking}
                    schedule_id={movie.schedule_id}
                  />
                </Col>

              ))) : (
                <Col lg="12" className="d-flex justify-content-center">
                  <div>No hay Peliculas para listar</div>   
                </Col>
              )
            }
          </Row>
        </div>
          { this.state.newMovie &&
            <CustomModal 
              show={this.state.newMovie}
              toggle={() => this.setState({ newMovie: false })}
              title='Crear Pelicula'
              centered
              closeButtonText='Close'
            >
              <CreateMovie onSuccess={() => this.fetchMovies(new Date()) }/>
            </CustomModal>
          }
      </Container>
    )
  }
}

export default MoviesList;
