import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <ul className="navbar-nav navbar-right">
        <li className="nav-item">
        <Link to="#" onClick = {this.logout.bind(this)} className="navbar-brand">Выйти</Link>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav navbar-right">
        <li className="nav-item">
        <Link to="/signup" className="navbar-brand">Регистрация</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="navbar-brand">Войти</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
{/* <Link to="/" className="navbar-brand">Navbar</Link> */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">Домой <span className="sr-only">(current)</span></Link>
          </li>
        </ul>
        { isAuthenticated ? userLinks : guestLinks }
        
      </div>
    </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);