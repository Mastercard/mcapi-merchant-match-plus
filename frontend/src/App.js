import React, {PureComponent} from 'react';
import { Route, Switch } from "react-router-dom";
import './assets/style.css';
import Shell from './shell';
import Home from './home';
import Transaction from './transaction';


export default class App extends PureComponent {

  render(){
    return (
      <Shell>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/transaction/:id" component={Transaction} />
        </Switch>
      </Shell>

    );
  }
}