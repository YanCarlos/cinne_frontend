import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFilm } from '@fortawesome/free-solid-svg-icons';

function LeftBar() {
  return (
    <div className="leftbar">
      <div className="logo">
        <span className="place">
          Place
        </span>
        <span className="it">
          it
        </span>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/reservas">
              <FontAwesomeIcon icon={faCalendar} className="icon"/>
              Reservas
            </Link>
          </li>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faFilm} className="icon"/>
              Peliculas
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default LeftBar;
