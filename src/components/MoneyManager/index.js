import './index.css'

import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

// eslint-disable-next-line
const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
const moneyDetailsList = [
  {
    id: v4(),
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    text: 'Your Balance',
    value: 0,
    alt: 'balance',
  },
  {
    id: v4(),
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    text: 'Your Income',
    value: 0,
    alt: 'income',
  },
  {
    id: v4(),
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    text: 'Your Expenses',
    value: 0,
    alt: 'expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: ' ',
    amountInput: '',
    typeInput: 'Income',
  }

  onTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onType = event => {
    this.setState({typeInput: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state
    const newTransaction = {
      id: v4(),
      Title: titleInput,
      Amount: parseInt(amountInput),
      Type: typeInput,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
    }))
  }

  getIncome = () => {
    let incomeAmount = 0
    const {transactionList} = this.state
    transactionList.forEach(each => {
      if (each.Type === 'Income') {
        incomeAmount = incomeAmount + each.Amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    let expensesAmount = 0
    const {transactionList} = this.state
    transactionList.forEach(each => {
      if (each.Type === 'Expenses') {
        expensesAmount = expensesAmount + each.Amount
      }
    })
    return expensesAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    transactionList.forEach(each => {
      if (each.Type === 'Income') {
        balanceAmount = balanceAmount + each.Amount
      } else {
        balanceAmount = balanceAmount - each.Amount
      }
    })
    return balanceAmount
  }

  deleteItem = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      each => id !== each.id,
    )
    this.setState({transactionList: updatedTransactionList})
  }

  render() {
    const {transactionList, typeInput} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    moneyDetailsList[0].value = balanceAmount
    moneyDetailsList[1].value = incomeAmount
    moneyDetailsList[2].value = expensesAmount

    return (
      <div className="bg">
        <div className="con">
          <div className="richard">
            <h1 className="heading">Hi Richard</h1>
            <p>
              Welcome Back To Your <span className="span">Money Manager</span>
            </p>
          </div>
          <ul className="un-order">
            {moneyDetailsList.map(each => (
              <MoneyDetails moneyDetails={each} key={each.id} />
            ))}
          </ul>
          <div className="main-div">
            <div className="form-div">
              <form className="form" onSubmit={this.onAdd}>
                <h1>Add Transaction</h1>
                <p>Title</p>
                <input type="text" onChange={this.onTitle} />
                <p>Amount</p>
                <input type="text" onChange={this.onAmount} />
                <p>Type</p>
                <select onChange={this.onType} id="select" value={typeInput}>
                  <option value="Income">Income</option>
                  <option value="Expenses">Expenses</option>
                </select>
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <ul className="result-con">
              <h1>History</h1>
              <li className="result-inner">
                <p className="itemsHead">Title</p>
                <p className="itemsHead">Amount</p>
                <p className="itemsHead">Type</p>
              </li>
              {transactionList.map(each => (
                <TransactionItem
                  transactionDetails={each}
                  deleteItem={this.deleteItem}
                  key={each.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
