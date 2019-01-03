import React, { Component } from 'react';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Hello Home!!!',
    };
  }

  render() {
    const { data } = this.state;
    return <div className="App">{data}</div>;
  }
}

export default App;
