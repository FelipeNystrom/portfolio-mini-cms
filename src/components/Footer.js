import React, { Component } from 'react';
import styles from './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <ul className={styles.contactInfo} />
      </div>
    );
  }
}

export default Footer;
