import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  updateTitleField = event => {
    this.setState({titleInput: event.target.value})
  }

  updateDateField = event => {
    // const date = format(new Date(event.target.value), 'dd MM yyyy,EEEE')
    // console.log(event.target.value)

    this.setState({dateInput: event.target.value})
  }

  submitFormResponse = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const appointment = {
      id: uuid(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, appointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleStarMark = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(item => {
        if (id === item.id) {
          return {...item, isStarred: !item.isStarred}
        }
        return item
      }),
    }))
  }

  activeFilterAction = () => {
    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
    }))
  }

  getFilteredAppointments = () => {
    const {isFilterActive, appointmentsList} = this.state

    if (isFilterActive) {
      const filteredList = appointmentsList.filter(
        item => item.isStarred === true,
      )
      return filteredList
    }
    return appointmentsList
  }

  renderFormContainer = () => {
    const {titleInput, dateInput} = this.state

    return (
      <form onSubmit={this.submitFormResponse}>
        <div className="input-container">
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            id="title"
            value={titleInput}
            onChange={this.updateTitleField}
            className="input-field"
            placeholder="Title"
          />
        </div>
        <div className="input-container">
          <label htmlFor="date">DATE</label>
          <input
            type="date"
            value={dateInput}
            onChange={this.updateDateField}
            className="date-field"
          />
        </div>
        <button type="submit" className="appointment-button">
          Add
        </button>
      </form>
    )
  }

  renderContentContainer = () => (
    <div className="content-container">
      <div className="container">
        <h1 className="heading">Add Appointment</h1>
        {this.renderFormContainer()}
      </div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
        alt="appointments"
        className="appointment-img-desktop"
      />
    </div>
  )

  render() {
    const appointmentsData = this.getFilteredAppointments()

    return (
      <div className="app-body">
        <div className="appointments-container">
          {this.renderContentContainer()}
          <div className="appointments-section">
            <div className="title-filter">
              <h1 className="appointments-title">Appointments</h1>
              <button
                type="button"
                onClick={this.activeFilterAction}
                className="starred"
              >
                Starred
              </button>
            </div>
            <ul className="appointments-items-list">
              {appointmentsData.map(item => (
                <AppointmentItem
                  appointmentItem={item}
                  toggleStarMark={this.toggleStarMark}
                  key={item.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments

// import {Component} from 'react'
// import {v4} from 'uuid'
// import {format} from 'date-fns'

// import AppointmentItem from '../AppointmentItem'

// import './index.css'

// class Appointments extends Component {
//   state = {
//     appointmentsList: [],
//     titleInput: '',
//     dateInput: '',
//     isFilterActive: false,
//   }

//   toggleIsStarred = id => {
//     this.setState(prevState => ({
//       appointmentsList: prevState.appointmentsList.map(eachAppointment => {
//         if (id === eachAppointment.id) {
//           return {...eachAppointment, isStarred: !eachAppointment.isStarred}
//         }
//         return eachAppointment
//       }),
//     }))
//   }

//   onClickFilter = () => {
//     const {isFilterActive} = this.state
//     this.setState({
//       isFilterActive: !isFilterActive,
//     })
//   }

//   onAddAppointment = event => {
//     event.preventDefault()
//     const {titleInput, dateInput} = this.state

//     const formattedDate = dateInput
//       ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
//       : ''

//     const newAppointment = {
//       id: v4(),
//       title: titleInput,
//       date: formattedDate,
//       isStarred: false,
//     }

//     this.setState(prevState => ({
//       appointmentsList: [...prevState.appointmentsList, newAppointment],
//       titleInput: '',
//       dateInput: '',
//     }))
//   }

//   onChangeDateInput = event => {
//     this.setState({dateInput: event.target.value})
//   }

//   onChangeTitleInput = event => {
//     this.setState({titleInput: event.target.value})
//   }

//   getFilteredAppointmentsList = () => {
//     const {appointmentsList, isFilterActive} = this.state
//     if (isFilterActive) {
//       return appointmentsList.filter(
//         eachTransaction => eachTransaction.isStarred === true,
//       )
//     }
//     return appointmentsList
//   }

//   render() {
//     const {titleInput, dateInput, isFilterActive} = this.state
//     const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
//     const filteredAppointmentsList = this.getFilteredAppointmentsList()

//     return (
//       <div className="app-container">
//         <div className="responsive-container">
//           <div className="appointments-container">
//             <div className="add-appointment-container">
//               <form className="form" onSubmit={this.onAddAppointment}>
//                 <h1 className="add-appointment-heading">Add Appointment</h1>
//                 <label htmlFor="title" className="label">
//                   TITLE
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   value={titleInput}
//                   onChange={this.onChangeTitleInput}
//                   className="input"
//                   placeholder="Title"
//                   autoComplete="OFF"
//                 />
//                 <label htmlFor="date" className="label">
//                   DATE
//                 </label>
//                 <input
//                   type="date"
//                   id="date"
//                   value={dateInput}
//                   onChange={this.onChangeDateInput}
//                   className="input"
//                 />
//                 <button type="submit" className="add-button">
//                   Add
//                 </button>
//               </form>
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
//                 alt="appointments"
//                 className="appointments-image"
//               />
//             </div>
//             <hr className="hr" />
//             <div className="header-with-filter-container">
//               <h1 className="appointments-heading">Appointments</h1>
//               <button
//                 type="button"
//                 className={`filter-style ${filterClassName}`}
//                 onClick={this.onClickFilter}
//               >
//                 Starred
//               </button>
//             </div>
//             <ul className="appointments-list">
//               {filteredAppointmentsList.map(eachAppointment => (
//                 <AppointmentItem
//                   key={eachAppointment.id}
//                   appointmentDetails={eachAppointment}
//                   toggleIsStarred={this.toggleIsStarred}
//                 />
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default Appointments
