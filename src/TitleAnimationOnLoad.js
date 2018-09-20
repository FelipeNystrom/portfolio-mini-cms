import React, { Component } from 'react';
import styles from './TitleAnimationOnLoad.css';

class TitleAnimation extends Component {
  state = {
    animate: false
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 0);
  }
  render() {
    const { animate } = this.state;
    const { upper, lower } = this.props;
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
            {upper}
          </div>
          <div
            className={
              !animate ? styles.lower : styles.lower + ' ' + styles.animateLower
            }
          >
            {lower}
          </div>
        </div>
      </div>
    );
  }
}

export default TitleAnimation;
