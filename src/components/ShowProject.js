import React, { Component } from 'react';
import styles from './ShowProject.css';

class ShowProject extends Component {
  state = {
    title: 'title',
    role: 'role',
    text: 'description'
  };

  componentDidUpdate(prevProps) {
    const { match, projects } = this.props;
    const { id } = match.params;

    if (prevProps.projects !== projects) {
      let projectToShow = projects.filter(
        project => project.id === parseInt(id, 0)
      );

      console.log(projectToShow);
      this.setState({
        title: projectToShow[0].title,
        role: projectToShow[0].role,
        text: projectToShow[0].body
      });
    }
  }

  render() {
    const { title, role, text } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h4>{title}</h4>
        </div>
        <div className={styles.role}>
          <p>
            Role: <span>{role}</span>
          </p>
        </div>
        <div className={styles.description}>
          <p>{text}</p>
        </div>
        {/* <div className={styles.competenses}>
          <ul>
            <li />
          </ul>
        </div> */}
      </div>
    );
  }
}

export default ShowProject;
