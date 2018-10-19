import React, { Component, Fragment } from 'react';
import NavbarLink from './NavbarLink';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import auth from '../_actions/userAction';
import styles from './Navbar.css';

class Navbar extends Component {
  state = {
    form: false,
    admin: false
  };

  componentDidMount() {
    const { form, admin } = this.props;

    if (form) {
      this.setState({ form: true });
    }

    if (admin) {
      this.setState({
        admin: true
      });
    }
  }

  logout = () => {
    this.props.dispatch(auth.Logout());
  };

  render() {
    const { form, admin } = this.state;
    const { username, match, loggedIn, projects } = this.props;

    return (
      <nav className={styles.wrapper}>
        <ul className={styles.links}>
          {(form || (admin && loggedIn)) && (
            <li>
              <Link to="/projects">
                <NavbarLink>Home</NavbarLink>
              </Link>
            </li>
          )}
          {!form &&
            !admin && (
              <li>
                <NavbarLink>About me</NavbarLink>
              </li>
            )}

          {admin &&
            loggedIn && (
              <Fragment>
                {username && (
                  <div className={styles.hiUser}>
                    Hi <span>{username}</span>! You have{' '}
                    <span>{projects.length}</span> projects
                  </div>
                )}
                <ul className={styles.userMenu}>
                  <li className={styles.link}>
                    <Link to={`${match.url}/create-project`}>New Project</Link>
                  </li>
                  <li className={styles.link}>
                    <Link to={`${match.url}/show-projects`}>Show projects</Link>
                  </li>
                  <li className={styles.link}>
                    <Link to="/projects">Home</Link>
                  </li>
                </ul>
              </Fragment>
            )}
        </ul>
        {!loggedIn ? (
          <Link to="/login">
            <div className={styles.loginLogoutWrapper}>
              <FontAwesomeIcon
                className={styles.loginLogout}
                icon="sign-in-alt"
              />
            </div>
          </Link>
        ) : (
          <Link to="/logout" onClick={this.logout}>
            <div className={styles.loginLogoutWrapper}>
              <FontAwesomeIcon
                onClick={this.logout}
                className={styles.loginLogout}
                icon="sign-out-alt"
              />
            </div>
          </Link>
        )}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.name,
    id: state.user.userId,
    projects: state.user.posts
  };
};

export default withRouter(connect(mapStateToProps)(Navbar));
