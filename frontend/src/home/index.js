import React, {PureComponent} from 'react';
import Account from './Account';
import TransactionList from './TransactionList';

export default class Home extends PureComponent {
  constructor(props){
    super(props);

    this.state = {};
  }

  componentDidMount(){
    document.getElementById('page-title').innerHTML = 'Account Details';
    fetch('/api/account').then(resp => resp.json()).then(account => this.setState({account}));
  }

  render(){
    const { account = {} } = this.state;
    return <div id='home'>
      <Account account={account} />
      <TransactionList transactions={account.transactions} />
    </div>
  }
}