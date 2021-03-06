import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Greetings from './Greetings';
import styles from './initalAnimation.css';

class Hello extends Component {
  state = {
    fadeIn: false,
    switchToGreeting: false,
    fullname: '',
    profilePic: '',
    redirect: false,
    loading: true
  };
  async componentDidMount() {
    const pp = localStorage.getItem('pp');
    const fn = localStorage.getItem('fn');
    if ((!pp || pp !== undefined) && (!fn || fn !== undefined)) {
      const res = await fetch('api/init');

          if (res.status === 204) {
            this.setState({ redirect: true });
          } else {
            const owner = await res.json();
            localStorage.setItem('pp', owner.profilepic);
            localStorage.setItem('fn', owner.concat);
            this.setState({
              loading: false,
              fullname: owner.concat,
              profilePic: owner.profilepic,
              fadeIn: true
            });
          }
        
    } else {
      this.setState({
        loading: false,
        fullname: fn,
        profilePic: pp,
        fadeIn: true
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.fadeIn !== this.state.fadeIn) {
      setTimeout(() => {
        this.setState({ switchToGreeting: true });
      }, 2500);
    }
  }
  render() {
    const {
      fadeIn,
      switchToGreeting,
      redirect,
      fullname,
      profilePic
    } = this.state;
    return (
      <Fragment>
        {!switchToGreeting && (
          <div className={styles.container}>
            <div
              className={
                fadeIn ? `${styles.hello} ${styles.animate}` : styles.fadeIn
              }
            >
              Hej!
            </div>
          </div>
        )}

        {switchToGreeting && (
          <Greetings fullname={fullname} profilePic={profilePic} />
        )}
        {redirect && <Redirect to="/register" />}
      </Fragment>
    );
  }
}

export default Hello;
