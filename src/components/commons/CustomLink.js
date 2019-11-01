import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CustomLink({text, to, activeOnlyWhenExact, icon}) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <li className={match ? "active-link" : ""}>
      { icon &&
        <FontAwesomeIcon icon={icon} className="icon color-white mr-10"/>
      }
      <Link to={to}>{text}</Link>
    </li>
  );;
}
