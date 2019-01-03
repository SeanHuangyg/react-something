import React, { Component } from 'react';
import './index.css';

class App extends Component {
  
  componentWillMount() {
    let a = 1
    if(typeof a === 'string'){
      console.log('string')
    }
  }
  
  render() {
    return (
      <div className="App">
        Hello Home!
      </div>
    );
  }
}

export default App;
