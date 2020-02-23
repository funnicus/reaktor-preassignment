import React, { Component } from 'react';
import Packages from './components/packages/Packages'
import PackageInfo from './components/packages/PackageInfo';
import { Route, Switch } from "react-router-dom";
import './App.css';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          packages: []
      }
  }
  //Fetching the JSON data of our packages from the server,
  //then saving it to state
  componentDidMount() {
      fetch('/api/packages')
      .then(res => res.json())
      .then(packages => this.setState({packages}, () => console.log('Packages fetched...',
      packages)));
  }

  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Packages packages={this.state.packages}/>} />
          <Route exact path="/packageinfo/:name" render={routeProps => <PackageInfo packages={this.state.packages} {...routeProps} />} />
        </Switch>
      </div>
    );
  }  
}

export default App;
