import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

let EVENTS_PATH = "http://127.0.0.1:8000/events/"

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
    // const [venues, setVenues] = useState([]);


  useEffect(() => {
     if (id) {
    const getEventDetails = async () => {
      const response = await axios.get(`${EVENTS_PATH}${id}`);
      setEvent(response.data);
    }
    getEventDetails();
  }}, [id]);

//   useEffect(() => {
//     const getVenues = async () => {
//         const response = await axios.get(VENUES_PATH);
//         setVenues(response.data.results);
//     };
//     getVenues();
// }, []);

  let navigate = useNavigate()

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
                    <input type="number" name="venue_id" value={event.venue_id} onChange={handleChange} required />
                    {/* <select name="venue_id" value={event.venue_id} onChange={handleChange} required>
                            <option value="">Select a venue</option>
                            {venues.map((venue) => (
                                <option key={venue.id} value={venue.id}>{venue.name}</option>
                            ))}
                        </select> */}
                </label>
                <button type="submit">{id ? 'Update' : 'Create'} Event</button>
            </form>
        ) : (
            <>
                <h1>{event.event_name}</h1>
                <h2>Performer: {event.performer_name}</h2>
                <p>Description: {event.performer_description}</p>
                <p>Date and Time: {event.event_dateAndTime}</p>
                <p>Price: {event.event_price}$</p>
                <button onClick={toggleEdit}>Edit</button>
                {id && <button onClick={handleDelete}>Delete</button>}
            </>
        )}
    </div>
);
}