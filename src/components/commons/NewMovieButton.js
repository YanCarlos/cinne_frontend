import React  from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function NewMovieButton({onclick, disabled}) {
  return(
    <Button color="primary" onClick={onclick} disabled={disabled}>
      <FontAwesomeIcon icon={faPlus} className="icon"/>
      Crear Nueva Pelicula
    </Button>
  )
}

export default NewMovieButton;
