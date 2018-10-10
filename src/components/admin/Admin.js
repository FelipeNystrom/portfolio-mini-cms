import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import HandleProject from './HandleProject';
import ShowProjects from './ShowProjects';

class Admin extends Component {
  state = {
    userId: '',
    projects: []
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
    const { userId } = this.state;
    const { projects } = this.props;
    // const { projects, userId } = user;
    return (
      <Fragment>
        {/* Internal routing */}
        <Route
          exact
          path="/admin"
          render={() => (
            <HandleProject
              userId={userId}
              projects={projects}
              updateProjects={this.updateProjects}
            />
          )}
        />

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
          render={props => <ShowProjects {...props} projects={projects} />}
        />

        <Route
          path={`/admin/edit/project/:id`}
          render={props => (
            <HandleProject
              {...props}
              projects={projects}
              userId={userId}
              update
            />
          )}
        />
      </Fragment>
    );
  }
}

export default Admin;
