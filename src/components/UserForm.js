import React, { Component, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDropzone from 'react-dropzone';
import auth from '../_actions/userAction';
import styles from './UserForm.css';

class Form extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    emailInput: '',
    firsNameInput: '',
    lastNameInput: '',
    files: [],
    register: false,
    registerNextPage: false,
    login: false,
    formErrors: false,
    formErrorMsg: '',
    redirect: false,
    setupPortfolio: false,
    unAuth: false,
    aboutMe: ''
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const { formName } = this.props;
    if (formName === 'register') {
      fetch('http://localhost:7000/').then(res => {
        if (res.status === 401) {
          this.setState({ unAuth: true });
        } else {
          this.setState({ register: true });
        }
      });
    }
    if (formName === 'login') {
      this.setState({ login: true });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.state.files.forEach(file => {
      window.URL.revokeObjectURL(file.preview);
    });
  }

  onPreviewDrop = (files, rejected) => {
    if (files) {
      this.setState({ files: files, fileTypeError: '' });
    }
    if (rejected.length !== 0) {
      this.setState({ fileTypeError: 'Image must be of type .jpg/.jpeg/.png' });
    }
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  nextPage = e => {
    e.preventDefault();
    this.setState({ registerNextPage: true });
  };

  handleSubmit = e => {
    const {
      register,
      login,
      usernameInput,
      passwordInput,
      emailInput,
      firsNameInput,
      lastNameInput,
      files,
      aboutMe
    } = this.state;
    e.preventDefault();
    if (this._isMounted) {
      if (login) {
        this.props.dispatch(auth.Login(usernameInput, passwordInput));
        if (this._isMounted) {
          this.setState({ redirect: true });
        }
      }
      if (register) {
        const formData = new FormData();
        formData.append('username', usernameInput);
        formData.append('password', passwordInput);
        formData.append('email', emailInput);
        formData.append('image', files[0]);
        formData.append('firstname', firsNameInput);
        formData.append('lastname', lastNameInput);
        formData.append('aboutMe', aboutMe);
        this.props.dispatch(auth.Register(formData));
        if (this._isMounted) {
          this.setState({ setupPortfolio: true });
        }
      }
    }
  };

  render() {
    const {
      usernameInput,
      passwordInput,
      formErrors,
      formErrorMsg,
      register,
      emailInput,
      redirect,
      firsNameInput,
      lastNameInput,
      files,
      setupPortfolio,
      unAuth,
      registerNextPage,
      login,
      aboutMe
    } = this.state;

    const { formName, loading } = this.props;
    return (
      <Fragment>
        <Fragment>
          {!loading ? (
            <div className={styles.wrapper}>
              <div className={styles.container}>
                <h1>{formName}</h1>
                {formErrors && (
                  <div className={styles.errorMsg}>{formErrorMsg}</div>
                )}
                <form onSubmit={this.handleSubmit}>
                  <Fragment>
                    {(login || register) &&
                      !registerNextPage && (
                        <Fragment>
                          <input
                            type="text"
                            name="usernameInput"
                            onChange={this.handleChange}
                            value={usernameInput}
                            placeholder="Username"
                            required
                          />
                          <input
                            type="password"
                            name="passwordInput"
                            onChange={this.handleChange}
                            value={passwordInput}
                            placeholder="Password"
                            required
                          />
                        </Fragment>
                      )}

                    {register &&
                      !registerNextPage && (
                        <Fragment>
                          <input
                            type="email"
                            name="emailInput"
                            onChange={this.handleChange}
                            value={emailInput}
                            placeholder="Email"
                            required
                          />
                          <input
                            type="text"
                            name="firsNameInput"
                            onChange={this.handleChange}
                            value={firsNameInput}
                            placeholder="Firstname"
                            required
                          />
                          <input
                            type="text"
                            name="lastNameInput"
                            onChange={this.handleChange}
                            value={lastNameInput}
                            placeholder="Lastname"
                            required
                          />
                        </Fragment>
                      )}

                    {register &&
                      registerNextPage && (
                        <Fragment>
                          <textarea
                            name="aboutMe"
                            onChange={this.handleChange}
                            value={aboutMe}
                            placeholder="About Me"
                          />

                          <ReactDropzone
                            className={styles.dropzone}
                            accept="image/jpeg, image/png"
                            onDrop={this.onPreviewDrop}
                            multiple={false}
                          >
                            <div className={styles.dropzoneInner}>
                              <h6>Drop Image Here</h6>
                            </div>
                          </ReactDropzone>
                          {files.length > 0 && (
                            <div className={styles.preview}>
                              <h6>Preview</h6>
                              {files.map((file, i) => (
                                <img
                                  alt="Preview"
                                  key={i}
                                  src={file.preview}
                                  className={styles.previewStyle}
                                />
                              ))}
                            </div>
                          )}
                        </Fragment>
                      )}

                    {(register || login) && !registerNextPage && !loading ? (
                      <input
                        type="button"
                        value="Next"
                        onClick={this.nextPage}
                      />
                    ) : (
                      <input type="submit" value={formName} />
                    )}
                  </Fragment>
                </form>
              </div>
            </div>
          ) : (
            <div>Setting up your portfolio</div>
          )}
          {setupPortfolio && <Redirect to="/" />}
          {redirect && <Redirect to="/admin" />}
        </Fragment>
        {unAuth && <Redirect to="/401" />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.user.loading
  };
};

export default withRouter(connect(mapStateToProps)(Form));
