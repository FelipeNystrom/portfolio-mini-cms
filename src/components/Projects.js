import React, { Component, Fragment } from 'react';
import Footer from './Footer';
import Card from './Card';
import Navbar from './Navbar';
import styles from './Projects.css';
import { connect } from 'react-redux';
// import * as types from '../actions/projectAction';

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

const mapStateToProps = (state, ownProps) => ({
  projects: state.projects
});

export default connect(mapStateToProps)(Projects);
