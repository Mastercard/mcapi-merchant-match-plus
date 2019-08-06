import React, {PureComponent} from 'react';
import Map from './Map';

const loading  = <div className='loading'>Loading...</div>;

export default class Transaction extends PureComponent {
  componentDidMount(){
    document.getElementById('page-title').innerHTML = 'Transaction Details';
    const id = this.props.match.params.id;
    fetch(`/api/transaction/${id}`)
      .then(resp => resp.json())
      .then(transaction => {
        this.setState({transaction});
        return fetch(`/api/merchant/${transaction.merchant.ref}`).then(resp => resp.json());
      })
      .then(merchant => this.setState({merchant}) );
  }

  render(){
    const { transaction, merchant = {} } = this.state || {};

    if (!transaction){
      return loading;
    }

    const fields = [
      {label: 'Date', value: transaction.trans_date},
      {label: 'Category', value: merchant.category},
      {label: 'Channel', value: merchant.channel},
      {label: 'Phone Number', value: merchant.phone},
      {label: 'Address', value: merchant.address},
    ];

    const {lat, lng, name} = merchant;
    const { category } = transaction.merchant;
    const mapProps = {lat, lng, label: name, category};
    return <div id='transaction'>
      <div id='map'>
        {lat && lng ? <Map {...mapProps}/> : loading}
      </div>
      <div id='merchant-info'>
        {merchant.name || transaction.merchant.name}
      </div>
      <div id='transaction-amount'>
        -${transaction.trans_amount / 100.0}
      </div>
      <div id='transaction-fields'>
        {fields.map(field => (
          <div className='transaction-field' key={field.label}>
            <label>{field.label}</label>
            <span>{field.value}</span>
          </div>
        ))}

      </div>
    </div>
  }
}