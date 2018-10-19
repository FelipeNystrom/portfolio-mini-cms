import React, { Component } from 'react';
import styles from './Card.css';
import { Link } from 'react-router-dom';

class Card extends Component {
  state = {
    animateOnLoad: false,
    showVideo: false
  };

  componentDidMount() {
    const { wait } = this.props;
    setTimeout(() => {
      this.setState({ animateOnLoad: true });
    }, wait);
  }

  render() {
    const { animateOnLoad } = this.state;
    const { children } = this.props;
    return (
      <Link to={`/project/${children.id}`}>
        <div
          className={
            animateOnLoad
              ? styles.wrapper + ' ' + styles.showOnLoad
              : styles.wrapper
          }
        >
          <div className={styles.container}>
            <div className={styles.imageWrapper}>
              <img src={children.image} alt="thumbnail" />
              <div className={styles.overlay}>
                <h3 className={styles.title}>{children.title}</h3>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
export default Card;
