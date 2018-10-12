import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import HandleProject from './HandleProject';
import ShowProjects from './ShowProjects';

class Admin extends Component {
  state = {
    userId: '',
    projects: []
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
          render={() => <HandleProject userId={userId} projects={projects} />}
        />

        <Route
          path={`/admin/create-project`}
          render={() => <HandleProject userId={userId} />}
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
