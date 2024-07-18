import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UserEvents () {
    const loggedInUser = localStorage.getItem('loggedInUser')
    const [userEvents, setUserEvents] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        const getUserEvents = async (userId) => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/users/${userId}`)
                // console.log(response.data.events)
                const events = await Promise.all(
                    response.data.events.map(eventUrl => axios.get(eventUrl))
                )
                setUserEvents(events.map(eventResponse => eventResponse.data))
            } catch (error) {
                console.error('Could not find users', error)
            }
        }
        if (loggedInUser) {
            getUserEvents(loggedInUser)
        }
    }, [loggedInUser])

    const showEvent = (id) => {
        navigate(`/events/${id}`)
    }
    
    return (
        <div className="events">
            <h1>Events I am attending</h1>
            <div className="events-grid">
            {userEvents.map((event) => (
                <div key={event.id} onClick={() => showEvent(event.id)} className="pathDesc">
                    <h2>{event.event_name}</h2>
                    <p>Performer: <span className="highlight">{event.performer_name}</span></p>
                    <p>Performer Description: {event.performer_description}</p>
                    <p>Date: <span className="highlight">{event.event_dateAndTime}</span></p>
                    <p>Price: <span className="highlight">{event.event_price}$</span></p>
                    <img src={event.photo_url}/>
                </div>
            ))}
            </div>
          </div>
    )
}