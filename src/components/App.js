import React, { Component, Fragment } from 'react';
import Projects from './Projects';
import initalAnimation from './initalAnimation';
import UserForm from './UserForm';
import Admin from './admin/Admin';
import Navbar from './Navbar';
import ShowProject from './ShowProject';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './App.css';

class App extends Component {
  state = {
    loggedIn: false
  };

  componentDidMount() {
    const { user } = this.props;
    if (user.name) {
      this.setState({ loggedIn: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.user !== user) {
      if (user.name) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    }
  }

  generateNavbar = (props, attribute = null) => {
    const { loggedIn } = this.state;
    if (attribute === 'admin')
      return <Navbar {...props} admin loggedIn={loggedIn} />;
    if (attribute === 'form')
      return <Navbar {...props} form loggedIn={loggedIn} />;
    return <Navbar {...props} loggedIn={loggedIn} />;
  };

  render() {
    const { projects, user } = this.props;
    return (
      <Fragment>
        <Route exact path="/" component={initalAnimation} />
        <Route
          exakt
          path="/projects"
          render={props => (
            <Fragment>
              {this.generateNavbar(props)}
              <div className={styles.wrapper}>
                <Projects projects={projects} {...props} />
              </div>
            </Fragment>
          )}
        />
        <Route
          path="/project/:id"
          render={props => (
            <Fragment>
              {this.generateNavbar(props)}
              <div className={styles.wrapper}>
                <ShowProject projects={projects} {...props} />
              </div>
            </Fragment>
          )}
        />
        <Route
          path="/login"
          render={props => (
            <Fragment>
              {this.generateNavbar(props, 'form')}
              <div className={styles.wrapper}>
                <UserForm {...props} formName="login" />
              </div>
            </Fragment>
          )}
        />

        <Route
          path="/register"
          render={props => (
            <Fragment>
              {this.generateNavbar(props, 'form')}
              <div className={styles.wrapper}>
                <UserForm formName="register" />
              </div>
            </Fragment>
          )}
        />
        <Route
          path="/admin"
          render={props => (
            <Fragment>
              {this.generateNavbar(props, 'admin')}
              <div className={styles.wrapper}>
                <Admin user={user} />
              </div>
            </Fragment>
          )}
        />
        <Route path="/logout" render={() => <Redirect to="/projects" />} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  user: state.user
});

export default withRouter(connect(mapStateToProps)(App));
