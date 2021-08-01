import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const initialList = [
  {
    id: uuid(),
    title: 'Meeting',
    date: format(new Date(2021, 5, 8), 'dd MM yyyy,EEEE'),
    isStarred: false,
  },
  {
    id: uuid(),
    title: 'Vacation',
    date: format(new Date(2021, 7, 8), 'dd MM yyyy,EEEE'),
    isStarred: true,
  },
  {
    id: uuid(),
    title: 'Business Trip Work',
    date: format(new Date(2021, 15, 8), 'dd MM yyyy,EEEE'),
    isStarred: true,
  },
  {
    id: uuid(),
    title: 'InAuguration',
    date: format(new Date(2021, 15, 8), 'dd MM yyyy,EEEE'),
    isStarred: false,
  },
  {
    id: uuid(),
    title: 'Hospital Checkup',
    date: format(new Date(2021, 7, 8), 'dd MM yyyy,EEEE'),
    isStarred: false,
  },
]

class Appointments extends Component {
  state = {
    appointmentsList: [...initialList],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  updateTitleField = event => {
    this.setState({titleInput: event.target.value})
  }

  updateDateField = event => {
    // const date = format(new Date(event.target.value), 'dd MM yyyy,EEEE')
    // console.log(date)

    this.setState({dateInput: event.target.value})
  }

  submitFormResponse = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const appointment = {
      id: uuid(),
      title: titleInput,
      date: format(new Date(dateInput), 'dd MM yyyy,EEEE'),
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
          <label htmlFor="date">Date</label>
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
