import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteItem} = props
  const {id, Title, Amount, Type} = transactionDetails
  const onDelete = () => {
    deleteItem(id)
  }
  return (
    <li className="result-inner">
      <p className="items">{Title}</p>
      <p className="items">{Amount}</p>
      <p className="items">{Type}</p>
      <img
        alt="delete"
        onClick={onDelete}
        className="image"
        src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
      />
    </li>
  )
}
export default TransactionItem
