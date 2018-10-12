import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './401.css';

class UnAuth extends Component {
  state = {
    redirect: false,
    counter: 4
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted === true) {
      setTimeout(this.redirect, 4001);
      setInterval(this.countDown, 1000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.countDown);
    clearTimeout(this.redirect);
  }

  countDown = () => {
    this.setState(prevState => ({ counter: prevState.counter - 1 }));
  };

  redirect = () => {
    this._isMounted = false;
    this.setState({ redirect: true });
  };

  render() {
    const { redirect, counter } = this.state;
    return (
      <Fragment>
        <div className={styles.wrapper}>
          <h1 className={styles.statusCode}>401</h1>
          <h3 className={styles.message}>
            Sorry you are not allowed to visit this site!
          </h3>
          <div className={styles.counter}>redirecting in {counter} seconds</div>
        </div>
        {redirect && <Redirect to="/projects" />}
      </Fragment>
    );
  }
}
export default UnAuth;
