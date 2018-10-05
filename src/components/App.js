import React, { Component, Fragment } from 'react';
import Projects from './Projects';
import initalAnimation from './initalAnimation';
import UserForm from './UserForm';
import Admin from './admin/Admin';
import ShowProject from './ShowProject';
import { Route, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={initalAnimation} />
        <Route exakt path="/projects" component={Projects} />
        <Route
          path="/project/:id"
          render={props => <ShowProject {...props} />}
        />
        <Route path="/login" render={() => <UserForm formName="login" />} />
        <Route
          path="/register"
          render={() => <UserForm formName="register" />}
        />
        <Route path="/admin" component={Admin} />
        <Route path="/logout" render={() => <Redirect to="/projects" />} />
      </Fragment>
    );
  }
}

export default App;
