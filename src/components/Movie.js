import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  imageLoaded(){
    this.setState({ loading: false });
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
      <div className="movie">
        {this.renderLoader()}
        <img 
          src={this.props.image_url} 
          alt={this.props.name}
          onLoad={this.imageLoaded.bind(this)}
        />
        <div className="booking">
          <Button color="primary" disabled={!this.props.can_booking}>Reservar</Button>
        </div>
      </div>
    )
  }
}

Movie.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image_url: PropTypes.string,
  can_booking: PropTypes.bool,
  schedule_id: PropTypes.string
};

export default Movie;
