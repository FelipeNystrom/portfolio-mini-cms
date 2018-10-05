import { Component } from 'react';

class CheckIfUser extends Component {
  componentDidMount() {
    const url = 'http://localhost:7000/admin';
    this.fetchUser(url);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.setUser !== prevProps.setUser) {
  //     const url = 'http://localhost:7000/admin';
  //     this.fetchUser(url);
  //   }
  // }

  fetchUser = url => {
    const { setUser } = this.props;
    fetch(url, {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });
  };
  render() {
    return null;
  }
}

export default CheckIfUser;
