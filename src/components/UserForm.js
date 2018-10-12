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
    login: false,
    formErrors: false,
    formErrorMsg: '',
    redirect: false,
    setupPortfolio: false
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

  handleSubmit = e => {
    const {
      register,
      login,
      usernameInput,
      passwordInput,
      emailInput,
      firsNameInput,
      lastNameInput,
      files
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
      setupPortfolio
    } = this.state;

    const { formName, loading } = this.props;
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
              <input
                type="password"
                name="passwordInput"
                onChange={this.handleChange}
                value={passwordInput}
                placeholder="Password"
                required
              />
              {register && (
                <Fragment>
                  {loading ? (
                    <div>Setting up your portfolio</div>
                  ) : (
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

                  {setupPortfolio && <Redirect to="/" />}
                </Fragment>
              )}

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
  return {
    loading: state.user.loading
  };
};

export default withRouter(connect(mapStateToProps)(Form));
