import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { CreateBooking } from '../../booking/index';
import CustomModal from '../../commons/CustomModal';

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newBooking: false
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

  newBooking() {
    this.setState({ newBooking: true })
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
          <Button 
            color="primary" 
            disabled={!this.props.can_booking} 
            onClick={() => this.newBooking()}
          >
            Reservar
          </Button>
        </div>
        { this.state.newBooking &&
          <CustomModal 
            show={this.state.newBooking}
            toggle={() => this.setState({ newBooking: false })}
            title='Reservar'
            centered
            closeButtonText='Close'
            size="lg"
          >
          <CreateBooking schedule_id={this.props.schedule_id}/>
          </CustomModal>
        }
      </div>
    )
  }
}

Movie.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image_url: PropTypes.string,
  can_booking: PropTypes.bool,
  schedule_id: PropTypes.number
};

export default Movie;
