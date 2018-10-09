import React, { Component, Fragment } from 'react';
import Footer from './Footer';
import Card from './Card';
import styles from './Projects.css';

class Projects extends Component {
  state = {
    animate: false,
    showCards: false,
    projects: []
  };

  componentDidMount() {
    this.setState({ animate: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.animate !== this.state.animate) {
      setTimeout(() => {
        this.setState({ showCards: true });
      }, 1000);
    }
  }

  render() {
    const { animate, showCards } = this.state;
    const { projects } = this.props;
    const generateProjects = projects.map((project, i) => (
      <Card wait={i * 450} key={project.id}>
        {project}
      </Card>
    ));

    return (
      <Fragment>
        <div>
          <div
            className={
              !animate
                ? styles.projectHeader
                : `${styles.projectHeader} ${styles.fadeIn}`
            }
          >
            Mina Projekt
          </div>
          <div className={styles.cardWrapper}>
            {showCards && generateProjects}
          </div>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default Projects;
