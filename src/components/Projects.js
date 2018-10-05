import React, { Component, Fragment } from 'react';
import Footer from './Footer';
import Card from './Card';
import Navbar from './Navbar';
import styles from './Projects.css';

class Projects extends Component {
  state = {
    animate: false,
    showCards: false,
    projects: []
  };

  componentDidMount() {
    const url = 'http://localhost:7000/';
    fetch(url)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({
          animate: true,
          projects: result.projects
        });
      })
      .catch(err => {
        console.error('error fetching projects: ', err);
        this.setState({ animate: true });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.animate !== this.state.animate) {
      setTimeout(() => {
        this.setState({ showCards: true });
      }, 1000);
    }
  }

  render() {
    const { projects, animate, showCards } = this.state;
    const generateProjects = projects.map((project, i) => (
      <Card wait={i * 450} key={project.id}>
        {project}
      </Card>
    ));

    return (
      <Fragment>
        <Navbar />
        <div className={styles.wrapper}>
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
