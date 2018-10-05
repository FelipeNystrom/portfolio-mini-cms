import React, { Component, Fragment } from 'react';
import NavbarLink from './NavbarLink';
import { Link } from 'react-router-dom';
import styles from './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Navbar extends Component {
  state = {
    loggedIn: false,
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
        admin: true,
        loggedIn: true,
        numberOfProjects: 0
      });
    }
  }
  componentDidUpdate(prevProps) {
    const { numberOfProjects } = this.props;
    if (prevProps.numberOfProjects !== numberOfProjects) {
      this.setState({ numberOfProjects });
    }
  }

  logout = () => {
    localStorage.removeItem('token');
    const url = 'http://localhost:7000/logout';
    fetch(url);
  };

  render() {
    const { loggedIn, form, admin } = this.state;
    const { username, numberOfProjects, match } = this.props;

    return (
      <nav className={styles.wrapper}>
        <ul className={styles.links}>
          {form && (
            <li>
              <Link to="/projects">
                <NavbarLink>Home</NavbarLink>
              </Link>
            </li>
          )}
          {!form &&
            !loggedIn && (
              <li>
                <NavbarLink>About me</NavbarLink>
                <Link to="/login">
                  <FontAwesomeIcon
                    className={styles.loginLogout}
                    icon="sign-in-alt"
                  />
                </Link>
              </li>
            )}

          {loggedIn &&
            admin && (
              <Fragment>
                {username && (
                  <div className={styles.hiUser}>
                    Hi <span>{username}</span>! You have{' '}
                    <span>{numberOfProjects}</span> projects
                  </div>
                )}
                <ul className={styles.userMenu}>
                  <li className={styles.link}>
                    <Link to={`${match.url}/create-project`}>New Project</Link>
                  </li>
                  <li className={styles.link}>
                    <Link to={`${match.url}/show-projects`}>Show projects</Link>
                  </li>
                </ul>

                <Link to="/logout" onClick={this.logout}>
                  <FontAwesomeIcon
                    className={styles.loginLogout}
                    icon="sign-out-alt"
                  />
                </Link>
              </Fragment>
            )}
        </ul>
      </nav>
    );
  }
}
