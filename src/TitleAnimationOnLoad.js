import React, { Component } from 'react';
import styles from './TitleAnimationOnLoad.css';

class TitleAnimation extends Component {
  render() {
    const { upper, lower } = this.props;
    return (
      <div className={styles.titleWrapper}>
        <div className={styles.firstTitle}>{upper}</div>
        <div className={styles.secondTitle}>{lower}</div>
      </div>
    );
  }
}

export default TitleAnimation;
