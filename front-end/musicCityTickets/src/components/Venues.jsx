import axios from 'axios'
import { useState, useEffect } from 'react'
import './Venues.css'

export default function Venues (props) {

    const [venues, setVenues] = useState([])

  useEffect(() => {
    getAllVenues()
  }, [])

  const getAllVenues = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/venues')
      setVenues(response.data)
    } catch (error) {
      console.error('Error getting venues:', error)
    }
  }

  return (

    <div className="venues-container">
      <h1>VENUES</h1>
      <div className="venues-grid">
        {venues.map(venue => (
          <div key={venue.id} className="venue-card">
            <h2>{venue.venue_name}</h2>
            <p>{venue.address}</p>
            <h4 className="venue-description">{venue.venue_description}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}