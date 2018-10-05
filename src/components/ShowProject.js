import React, { Component } from 'react';
import styles from './ShowProject.css';

class ShowProject extends Component {
  state = {
    title: 'title',
    role: 'role',
    text: 'description'
  };

  componentDidMount() {
    const { params } = this.props;

    console.log(params);
  }

  render() {
    const { title, role, text } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h4>{title}</h4>
        </div>
        <div className={styles.role}>
          <h6>{role}</h6>
        </div>
        <div className={styles.description}>
          <p>{text}</p>
        </div>
        <div className={styles.competenses}>
          <ul>
            <li />
          </ul>
        </div>
      </div>
    );
  }
}

export default ShowProject;
