import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import styles from './Admin.css';
import CheckIfUser from './CheckIfUser';
import Navbar from '../Navbar';
import HandleProject from './HandleProject';
import ShowProjects from './ShowProjects';

class Admin extends Component {
  state = {
    isLoggedIn: false,
    username: '',
    userId: '',
    projects: []
  };

  setUser = data => {
    this.setState({
      isLoggedIn: true,
      username: data.user,
      userId: data.id,
      projects: data.posts
    });
  };

  updateProjects = id => {
    const url = 'http://localhost:7000/admin/projects';
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ projects: data.posts }));
  };

  render() {
    const { username, projects, userId } = this.state;
    const { match } = this.props;
    return (
      <Fragment>
        <CheckIfUser setUser={this.setUser} />
        <Navbar
          admin
          match={match}
          numberOfProjects={projects.length}
          username={username}
        />

        {/* Internal routing */}
        <Route
          exact
          path="/admin"
          render={() => (
            <div className={styles.wrapper}>
              <HandleProject
                userId={userId}
                updateProjects={this.updateProjects}
              />
            </div>
          )}
        />

        <div className={styles.wrapper}>
          <Route
            path={`/admin/create-project`}
            render={() => (
              <HandleProject
                userId={userId}
                updateProjects={this.updateProjects}
              />
            )}
          />

          <Route
            path={`/admin/show-projects`}
            render={() => <ShowProjects match={match} projects={projects} />}
          />

          <Route
            path={`/admin/edit/project/:id`}
            render={props => (
              <HandleProject
                {...props}
                userId={userId}
                update
                updateProjects={this.updateProjects}
              />
            )}
          />
        </div>
      </Fragment>
    );
  }
}

export default Admin;
