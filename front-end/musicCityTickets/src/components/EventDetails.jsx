import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './EventDetails.css'

let EVENTS_PATH = "http://127.0.0.1:8000/events/"
const VENUES_PATH = "http://127.0.0.1:8000/venues/"

export default function EventDetails () {

    const { id } = useParams();
    const [event, setEvent] = useState({
        event_name: '',
        performer_name: '',
        performer_description: '',
        event_dateAndTime: '',
        event_price: '',
        venue_id: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [venues, setVenues] = useState([]);
    const [userEvents, setUserEvents]= useState([])
    const loggedInUser = localStorage.getItem('loggedInUser')
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            const getEventDetails = async () => {
                const response = await axios.get(`${EVENTS_PATH}${id}`);
                setEvent(response.data);
            }
            getEventDetails();
        }
    }, [id]);

    useEffect(() => {
        const getVenues = async () => {
            const response = await axios.get(VENUES_PATH);
            console.log(response.data)
            setVenues(response.data);
        };
        getVenues();
    }, []);

    useEffect(() => {
        const getUserEvents = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/users/${loggedInUser}`)
                const events = await Promise.all(
                    response.data.events.map(eventUrl => axios.get(eventUrl))
                )
                setUserEvents(events.map(eventResponse => eventResponse.data))
            } catch (error) {
                console.error('Could not fetch user events', error)
            }
        }
        getUserEvents()
    }, [loggedInUser])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await axios.put(`${EVENTS_PATH}${id}`, event);
        } else {
            console.log(event)
            await axios.post(EVENTS_PATH, event);

        }
        navigate('/events');
    }

    const handleDelete = async () => {
        await axios.delete(`${EVENTS_PATH}${id}`);
        navigate('/events');
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const addToMyEvents = async (eventId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/users/${loggedInUser}/add_event/`, { event_id: eventId })
            setUserEvents([...userEvents, event])
        } catch (error) {
            console.error('Could not add event to user', error)
        }
    }

    const removeFromMyEvents = async (eventId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/users/${loggedInUser}/remove_event/`, { event_id: eventId })
            setUserEvents(userEvents.filter(e => e.id !== eventId))
        } catch (error) {
            console.error('Could not remove event from user', error)
        }
    }
    const isUserAttending = userEvents.some(e => e.id === event.id)

  if (!event) {
    return <h3>Searching Events</h3>
  }
  return (
    <div className="eventDetails">
        {isEditing ? (
            <form onSubmit={handleSubmit}>
                <label>
                    Event Name:
                    <input type="text" name="event_name" value={event.event_name} onChange={handleChange} required />
                </label>
                <label>
                    Performer Name:
                    <input type="text" name="performer_name" value={event.performer_name} onChange={handleChange} required />
                </label>
                <label>
                    Performer Description:
                    <textarea name="performer_description" value={event.performer_description} onChange={handleChange} required />
                </label>
                <label>
                    Date and Time:
                    <input type="text" name="event_dateAndTime" value={event.event_dateAndTime} onChange={handleChange} required />
                </label>
                <label>
                    Price:
                    <input type="number" name="event_price" value={event.event_price} onChange={handleChange} required />
                </label>
                <label>
                    Venue:
        
                    <select name="venue_id" value={event.venue_id} onChange={handleChange} required>
                            <option value="">Select a venue</option>
                            {venues.map((venue) => (
                                <option key={venue.id} value={venue.id}>{venue.venue_name}</option>
                            ))}
                            
                        </select>
                </label>
                <button type="submit">{id ? 'Update' : 'Create'} Event</button>
            </form>
        ) : (
            <>
                {loggedInUser && (
                    isUserAttending ? (
                        <button className="attendButton" onClick={() => removeFromMyEvents(event.id)}>No longer attending</button>
                    ) : (
                        <button className="attendButton" onClick={() => addToMyEvents(event.id)}>Attend</button>
                    )
                )}
                <h1>{event.event_name}</h1>
                <h2>Performer: {event.performer_name}</h2>
                <p>Description: {event.performer_description}</p>
                <p>Date and Time: {event.event_dateAndTime}</p>
                <p>Price: ${event.event_price}</p>
                <div className="button-container">
                <button onClick={toggleEdit}>Edit</button>
                {id && <button className="deleteButton" onClick={handleDelete}>Delete</button>}
                </div>
            </>
        )}
    </div>
);
}