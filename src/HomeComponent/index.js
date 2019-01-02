import React, { Component } from 'react';
import './index.css';

class App extends Component {
  
  componentWillMount() {
    let a = true;
    if(a){
      console.log('test something');
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
