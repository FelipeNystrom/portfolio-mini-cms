import React, { Component } from 'react';
import styles from './App.css';
import Card from './Card';
import TitleAnimation from './TitleAnimationOnLoad';

class App extends Component {
  state = {
    projects: [1, 2, 3, 4, 5, 6, 7]
  };
  render() {
    const titlePhrase = ['Jag är Aida Amoli!', 'Kul att du hittat hit'];
    const { projects } = this.state;
    const generateProjects = projects.map((project, i) => (
      <Card key={i}>{i}</Card>
    ));
    return (
      <div className={styles.wrapper}>
        <TitleAnimation upper={titlePhrase[0]} lower={titlePhrase[1]} />
        <div className={styles.cardWrapper}>{generateProjects}</div>
      </div>
    );
  }
}

export default App;
