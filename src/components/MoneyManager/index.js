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
    typeInput: '',
    balance: 0,
    income: 0,
    expenses: 0,
  }

  onTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onAmount = event => {
    const {typeInput} = this.state
    this.setState({amountInput: event.target.value})
    if (typeInput === 'Income') {
      this.setState(prevState => ({
        balance: prevState.balance + parseInt(event.target.value),
      }))
      this.setState(prevState => ({
        income: prevState.income + parseInt(event.target.value),
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance - parseInt(event.target.value),
      }))
    }
  }

  onType = event => {
    const {expenses} = this.state
    this.setState({typeInput: event.target.value})
    if (event.target.value === 'Expenses') {
      this.setState(prevState => ({
        expenses: prevState.expenses + expenses,
      }))
    }
  }

  onAdd = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state
    const newTransaction = {
      id: v4(),
      Title: titleInput,
      Amount: amountInput,
      Type: typeInput,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
    }))
  }

  render() {
    const {transactionList, balance, income, expenses} = this.state
    moneyDetailsList[0].value = balance
    moneyDetailsList[1].value = income
    moneyDetailsList[2].value = expenses
    console.log(balance)
    console.log(expenses)
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
                <h1>{expenses}</h1>
                <p>Title</p>
                <input type="text" onChange={this.onTitle} />
                <p>Amount</p>
                <input type="text" onChange={this.onAmount} />
                <p>Type</p>
                <select onChange={this.onType}>
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
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>
              {transactionList.map(each => (
                <TransactionItem transactionDetails={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
