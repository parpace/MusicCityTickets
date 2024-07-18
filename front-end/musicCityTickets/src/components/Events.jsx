import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

let EVENTS_PATH = "http://127.0.0.1:8000/events/"

export default function Events () {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const getEvents = async () => {
            const response = await axios.get(EVENTS_PATH)
            setEvents(response.data)
            console.log(response.data)
        }
        getEvents()
    }, []);

    let navigate = useNavigate()

    const showEvent = (id) => {
        navigate(`/events/${id}`)
    }
    const handleCreate = () => {
        navigate('/events/new');
    }

    if (events.length === 0) {
        return <h2>Loading Events</h2>
    } 
        return (
            
            <div className="pathInfo">
            <h1>Events Page</h1>
            <button onClick={handleCreate}>Create New Event</button>
            {events.map((event) => (
                <div key={event.id} onClick={() => showEvent(event.id)} className="pathDesc">
                    <h2>{event.event_name}</h2>
                    <h2>Performer: {event.performer_name}</h2>
                    <h2>Performer Description: {event.performer_description}</h2>
                    <h2>Date: {event.event_dateAndTime}</h2>
                    <h2>Price: {event.event_price}$</h2>
                </div>
            ))}
          </div>
        )
        
    }
