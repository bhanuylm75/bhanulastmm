import './index.css'

const MoneyDetails = props => {
  const {moneyDetails} = props
  const {imgUrl, text, value, alt} = moneyDetails

  return (
    <li className={`list ${alt}`}>
      <img className="img" alt={alt} src={imgUrl} />
      <div className="inner-card">
        <p className="para">{text}</p>
        <p className="para">{value}</p>
      </div>
    </li>
  )
}
export default MoneyDetails
