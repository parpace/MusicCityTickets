import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Venues.css'

export default function Venues (props) {

    const [venues, setVenues] = useState([])
    const navigate = useNavigate()

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
  const handleVenueClick = (id) => {
    navigate(`/venue/${id}`)
  }

  return (

    <div className="venues-container">
      <h1>VENUES</h1>
      <div className="venues-grid">
        {venues.map(venue => (
          <div 
          key={venue.id} 
          className="venue-card"
          onClick={() => handleVenueClick(venue.id)}
          >
            <h2>{venue.venue_name}</h2>
            <p>{venue.address}</p>
            <h4 className="venue-description">{venue.venue_description}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}