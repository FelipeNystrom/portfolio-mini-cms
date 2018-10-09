import React, { Component, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../_actions/userAction';
import styles from './UserForm.css';

class Form extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    emailInput: '',
    register: false,
    login: false,
    formErrors: false,
    formErrorMsg: '',
    redirect: false
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const { formName } = this.props;
    if (formName === 'register') {
      this.setState({ register: true });
    }
    if (formName === 'login') {
      this.setState({ login: true });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // componentDidUpdate(prevProps) {
  //   const { formName } = this.props;
  //   if (prevProps.formName !== this.props.formName) {
  //     if (formName === 'register') {
  //       this.setState({ register: false });
  //     }
  //     if (formName === 'login') {
  //       this.setState({ login: false });
  //     }
  //   }
  // }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    const {
      register,
      login,
      usernameInput,
      passwordInput,
      emailInput
    } = this.state;
    e.preventDefault();
    if (this._isMounted) {
      if (login) {
        this.props.dispatch(Auth.login(usernameInput, passwordInput));
        if (this._isMounted) {
          this.setState({ redirect: true });
        }
      }
      if (register) {
        Auth.register(usernameInput, passwordInput, emailInput);
        if (this._isMounted) {
          this.setState({ redirect: true });
        }
      }
    }

    // this.setState({
    //   usernameInput: '',
    //   passwordInput: '',
    //   emailInput: '',
    //   formErrors: true,
    //   formErrorMsg: 'Ooops!\n Do you have the right credentials?'
    // });
  };

  send = async (username, password, email = null) => {
    const { formName } = this.props;
    const apiUrl = `http://localhost:7000/${formName}`;
    fetch(apiUrl, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          if (this._isMounted) {
            this.setState({ redirect: true });
          }
        }
      });
  };

  render() {
    const {
      usernameInput,
      passwordInput,
      formErrors,
      formErrorMsg,
      register,
      emailInput,
      redirect
    } = this.state;

    const { formName } = this.props;
    return (
      <Fragment>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <h1>{formName}</h1>
            {formErrors && (
              <div className={styles.errorMsg}>{formErrorMsg}</div>
            )}
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="usernameInput"
                onChange={this.handleChange}
                value={usernameInput}
                placeholder="Username"
                required
              />

              {register && (
                <input
                  type="email"
                  name="emailInput"
                  onChange={this.handleChange}
                  value={emailInput}
                  placeholder="Email"
                  required
                />
              )}
              <input
                type="password"
                name="passwordInput"
                onChange={this.handleChange}
                value={passwordInput}
                placeholder="Password"
                required
              />
              <input type="submit" value={formName} />
            </form>
          </div>
        </div>
        {redirect && <Redirect to="/admin" />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(Form));
