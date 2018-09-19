import React, { Component } from 'react';
import styles from './Card.css';

class Card extends Component {
  state = {
    showVideo: false
  };
  render() {
    const { children } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <img src="#" alt="thumbnail" />
        </div>
        <h4 className={styles.title}>{children}</h4>
      </div>
    );
  }
}
export default Card;
