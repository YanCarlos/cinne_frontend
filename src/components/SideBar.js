import React from 'react';
import { faCalendar, faFilm } from '@fortawesome/free-solid-svg-icons';
import CustomLink from './commons/CustomLink';

function SideBar() {
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
          <CustomLink to="/reservas" text="Reservas" icon={faCalendar} activeOnlyWhenExact={true}/>
          <CustomLink to="/" text="Peliculas" icon={faFilm} activeOnlyWhenExact={true} />
        </ul>
      </nav>
    </div>
  )
}
export default SideBar;
