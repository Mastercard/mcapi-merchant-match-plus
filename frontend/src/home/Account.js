import React, {PureComponent} from 'react';

export default class Account extends PureComponent {

  render(){
    const { account = {} } = this.props;

    return <div id='account'>
      <div id='account-info'>
        <div id='account-name'>
          <span>{account.name}</span>
          <span>{account.last4}</span>
        </div>
        <div id='account-balance'>
          <label>Available balance</label>
          <span>${account.balance / 100.0}</span>
        </div>
      </div>
      <hr />
      <div id='account-action'>
        <span><a>Pay Bills</a></span>
        <span><a>More </a></span>
      </div>

    </div>;
  }
}