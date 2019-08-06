import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';
import iconFood from '../assets/img/icon_food.svg';
import iconMovies from '../assets/img/icon_movies.svg';
import iconOnlineRetail from '../assets/img/icon_online_retail.svg';
import iconRetail from '../assets/img/icon_retail.svg';
import forwardArrow from '../assets/img/forward_arrow.svg';

const getTransactionIcon = category => {
  let src = null;
  switch (category) {
    case 'food': src = iconFood; break;
    case 'movies': src = iconMovies; break;
    case 'online_retail': src = iconOnlineRetail; break;
    case 'retail': src = iconRetail; break;
  }

  return <img src={src} />
}

export default class TransactionList extends PureComponent {



  render(){
    const { transactions } = this.props;

    return <div id='transaction-list'>
      <h1>Transactions</h1>
      { transactions &&
        transactions.map (trans => (
          <div className='transaction-item' key={trans.id}>
            <div className='transaction-icon'>
              {getTransactionIcon(trans.merchant.category)}
            </div>
            <div className='transaction-description'>
              <span>{trans.merchant.name}</span>
              <span className='transaction-date'>{trans.trans_date}</span>
            </div>
            <div className='transaction-amount'>-${trans.trans_amount / 100.0}</div>
            <div className='transaction-nav'><Link to={`/transaction/${trans.id}`} ><img src={forwardArrow} /></Link></div>
          </div>
        ))
      }

    </div>;
  }
}