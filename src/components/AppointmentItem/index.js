import './index.css'

const starNoFill =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

const starFill =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

const AppointmentItem = props => {
  const {appointmentItem, toggleStarMark} = props
  const {id, title, date, isStarred} = appointmentItem
  //   console.log(props)

  const star = isStarred ? starFill : starNoFill

  const changePriority = () => {
    toggleStarMark(id)
  }

  return (
    <li className="appointment-item">
      <div className="title-date-container">
        <p className="title">{title}</p>
        <p className="date">Date: {date}</p>
      </div>
      {/* <div className="star-container"> */}
      <button
        type="button"
        testid="star"
        onClick={changePriority}
        className="star-button"
      >
        <img src={star} alt="star" className="star-img" />
      </button>
      {/* </div> */}
    </li>
  )
}

export default AppointmentItem
