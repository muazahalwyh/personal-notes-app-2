import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import ToggleTheme from "./ToggleTheme";
import ToggleLocale from "./ToggleLocale";
import { LocaleConsumer } from '../contexts/LocaleContext';

function Navigation({ logout, name }) {
  return (
  <LocaleConsumer>
    {
      ({locale}) => {
        return (
        <nav className="navigation">
          <ul>
            <li><Link to="/archived">{locale === 'id' ? 'Terarsip' : 'Archived' }</Link></li>
            <li><ToggleLocale /></li>
            <li><ToggleTheme/></li>
            <li>
              <button className="button-logout" type="button" onClick={logout}>{name}<FiLogOut/></button>
            </li>
          </ul>
        </nav>
        );
      }
    }
  </LocaleConsumer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default Navigation;