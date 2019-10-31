import React  from 'react';
import MovieService from '../services/MovieService';
import Movie from './Movie';
import { Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import CustomModal from './commons/CustomModal';
import NewMovieButton from './commons/NewMovieButton';
import NewMovie from './NewMovie';

class MovieList extends React.Component {
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
      <div className="movies">
        <div className="title d-flex justify-content-between"> 
          <h2>Peliculas</h2>
          <NewMovieButton onclick={() => this.newMovie()} />
        </div>

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
            <Col lg="12" className="d-flex justify-content-center">
              {this.renderLoader()}
            </Col>
            {
              this.state.movies.length ? (
              this.state.movies.map(movie => (
                <Col lg="3" className="column" key={movie.id}>
                  <Movie
                    name={movie.name}
                    image_url={movie.image_url} 
                    can_booking={movie.can_booking}
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
              <NewMovie onSuccess={() => this.fetchMovies(new Date()) }/>
            </CustomModal>
          }
      </div>
    )
  }
}

export default MovieList;
