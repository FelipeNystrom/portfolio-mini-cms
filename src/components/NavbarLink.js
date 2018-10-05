import React, { Component } from 'react';
import styles from './NavbarLink.css';

export default class NavbarLink extends Component {
  render() {
    const { children, disabled } = this.props;
    return (
      <div disabled={disabled} className={styles.link}>
        {children}
      </div>
    );
  }
}
