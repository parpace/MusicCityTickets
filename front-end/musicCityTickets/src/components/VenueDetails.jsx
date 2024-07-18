import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './VenueDetails.css'

export default function VenueDetails () {
    const { id } = useParams()
  const [venue, setVenue] = useState(null)

  useEffect(() => {
    getVenueDetails()
  }, []);

  const getVenueDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/venues/${id}`)
      setVenue(response.data)
    } catch (error) {
      console.error('Error getting venue details:', error)
    }
  }

  if (!venue) {
    return <div>Loading...</div>
  }

  return (
    <div className="venue-details-container">
      <h1>{venue.venue_name}</h1>
      <p>{venue.address}</p>
      <p>{venue.venue_description}</p>
      <h2>Events</h2>
      <ul>
        {venue.events.map(event => (
          <li key={event.id}>
            <h3>{event.event_name}</h3>
            <h4>Artist: {event.performer_name}</h4>
            <p>{event.event_dateAndTime}</p>
            <p>Price: ${event.event_price}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}