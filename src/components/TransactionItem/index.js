import './index.css'

const TransactionItem = props => {
  const {transactionDetails} = props
  const {Title, Amount, Type} = transactionDetails
  return (
    <li className="result-inner">
      <p>{Title}</p>
      <p>{Amount}</p>
      <p>{Type}</p>
    </li>
  )
}
export default TransactionItem
