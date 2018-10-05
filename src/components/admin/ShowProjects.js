import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ShowProjects.css';

class ShowProjects extends Component {
  state = {
    projects: [],
    loading: false
  };
  componentDidMount() {
    const { projects } = this.props;
    this.setState({ projects: projects });
  }

  componentDidUpdate(prevProps, prevState) {
    const { projects } = this.props;
    if (prevState.projects !== projects) {
      this.setState({ projects: projects });
    }
  }

  render() {
    const { match } = this.props;
    const { projects, loading } = this.state;
    const generateProjects = projects.map((project, i) => (
      <li key={i} className={styles.item}>
        <div className={styles.itemTitle}>{project.title}</div>
        <span className={styles.option}>
          <button>
            <Link to={`${match.url}/edit/project/${project.id}`}>Edit</Link>
          </button>
        </span>
      </li>
    ));

    return (
      <ul className={styles.wrapper}>
        {projects.length > 0 && !loading ? (
          generateProjects
        ) : (
          <div>You dont have any projects to show</div>
        )}
      </ul>
    );
  }
}

export default ShowProjects;
