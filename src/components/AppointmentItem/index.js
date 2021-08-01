import './index.css'

const star =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

const starFill =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

const AppointmentItem = props => {
  const {appointmentItem, toggleStarMark} = props
  const {id, title, date, isStarred} = appointmentItem
  //   console.log(props)

  const starred = isStarred ? starFill : star

  const changePriority = () => {
    toggleStarMark(id)
  }

  return (
    <li className="appointment-item">
      <div className="title-date-container">
        <h1 className="title">{title}</h1>
        <p className="date">Date: {date}</p>
      </div>
      {/* <div className="star-container"> */}
      <button
        type="button"
        testid="star"
        onClick={changePriority}
        className="star-button"
      >
        <img src={starred} alt="star" className="star-img" />
      </button>
      {/* </div> */}
    </li>
  )
}

export default AppointmentItem
