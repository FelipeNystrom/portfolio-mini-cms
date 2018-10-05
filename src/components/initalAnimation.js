import React, { Component, Fragment } from 'react';
import Greetings from './Greetings';
import styles from './initalAnimation.css';

class Hello extends Component {
  state = {
    fadeIn: false,
    switchToGreeting: false
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ fadeIn: true });
    }, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.fadeIn !== this.state.fadeIn) {
      setTimeout(() => {
        this.setState({ switchToGreeting: true });
      }, 3200);
    }
  }
  render() {
    const { fadeIn, switchToGreeting } = this.state;
    const titlePhrase = ['Jag heter Aida Amoli!', 'Kul att du hittat hit'];
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
          <Greetings upper={titlePhrase[0]} lower={titlePhrase[1]} />
        )}
      </Fragment>
    );
  }
}

export default Hello;
