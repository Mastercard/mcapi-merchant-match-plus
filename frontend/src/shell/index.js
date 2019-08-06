import React, {PureComponent} from 'react';
import { Route, Switch, Link } from "react-router-dom";
import menuSvg from '../assets/img/icon-menu.svg';
import backSvg from '../assets/img/back_arrow.svg'

const menuIcon = ()=> <img src={menuSvg} />;
const backIcon = ()=> <Link to="/"><img src={backSvg} /></Link>;

export default class Shell extends PureComponent {

  render(){
    return (<div id='page'>
      <div id='page-header'>
        <div id='nav-icon'>
          <Switch>
            <Route exact path="/" component={menuIcon} />
            <Route component={backIcon} />
          </Switch>
        </div>
        <div id='page-title'>
          Page title
        </div>
      </div>
      <div id='page-content'>
        {this.props.children}
      </div>
    </div>);
  }
}