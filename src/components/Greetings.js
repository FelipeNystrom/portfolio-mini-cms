import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Greetings.css';

class TitleAnimation extends Component {
  state = {
    animate: false,
    redirect: false
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.animate !== this.state.animate) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 4000);
    }
  }
  render() {
    const { animate, redirect } = this.state;
    const { fullname, profilePic } = this.props;
    console.log(this.props);
    return (
      <div className={styles.titleWrapper}>
        <div className={styles.animationWrapper}>
          <div
            className={
              !animate
                ? styles.upper
                : styles.upper + ' ' + styles.showBorderBottom
            }
          >
            Jag heter <span className={styles.fullName}>{fullname}</span>
          </div>
          <div
            className={
              !animate ? styles.lower : styles.lower + ' ' + styles.animateLower
            }
          >
            Kul att du hittat hit
          </div>
          <div className={styles.imgWrapper}>
            <img
              className={
                !animate
                  ? styles.profilePic
                  : styles.profilePic + ' ' + styles.animateProfilePic
              }
              src={profilePic}
              alt="profile-pic"
            />
          </div>
        </div>
        {redirect && <Redirect to="/projects" />}
      </div>
    );
  }
}

export default TitleAnimation;
