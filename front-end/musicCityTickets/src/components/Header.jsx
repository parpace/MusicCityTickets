import '../header.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Levenshtein from 'fast-levenshtein'

export default function Header () {
    const [searchQuery, setSearchQuery] = useState('')
    const [userData, setUserData] = useState({})
    const [userMenu, setUserMenu] = useState(false)
    const navigate = useNavigate()
    const loggedInUser = localStorage.getItem('loggedInUser')

    useEffect(() => {
        if (loggedInUser) {
            const getUserData = async (userId) => {
                const response = await axios.get(`http://127.0.0.1:8000/users/${userId}`)
                console.log(response)
                setUserData(response.data)
            }
            getUserData(loggedInUser)
        }
    }, [loggedInUser])

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const [venuesResponse, eventsResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8000/venues/'),
                axios.get('http://127.0.0.1:8000/events/')
            ])
            const venues = venuesResponse.data
            const events = eventsResponse.data

            // Adjust the search query so that capitalization and extra spaces don't matter
            const adjustedSearchQuery = searchQuery.trim().toLowerCase()

            const findVenue = venues.find(venue =>
                venue.venue_name.toLowerCase().includes(adjustedSearchQuery)
            )
            const findEvent = events.find(event =>
                event.event_name.toLowerCase().includes(adjustedSearchQuery)
            )

            if (findVenue) {
                navigate(`/venues/${findVenue.id}`)
            } else if (findEvent) {
                navigate(`/events/${findEvent.id}`)
            } else {
                // Had to go deep with AI to get this solution! I was using a .includes method to filter venues and events that had similiar characters to the search, but I wanted more... A search that actually tries to find the MOST similiar events and venues. Super fun to learn about different ways of comparing words.
                const potentialMatches = [
                    ...venues.map(venue => ({
                        ...venue,
                        type: 'venue',
                        similarity: Levenshtein.get(adjustedSearchQuery, venue.venue_name.toLowerCase())
                    })),
                    ...events.map(event => ({
                        ...event,
                        type: 'event',
                        similarity: Levenshtein.get(adjustedSearchQuery, event.event_name.toLowerCase())
                    }))
                ]

                potentialMatches.sort((a, b) => a.similarity - b.similarity)

                navigate('/search', {
                    state: {
                        searchQuery,
                        potentialMatches
                    }
                })
            }
        } catch (error) {
            console.error('Error fetching data:', error)
            alert('There was an error processing your search.')
        }
    }

    const toggleUserMenu = () => {
        setUserMenu(!userMenu)
    }
    
    return (
        <div className="header">
            <h1 className="logo" onClick={() => navigate('/')}>Logo</h1>
            <form className="searchForm" onSubmit={handleSubmit}>
                <input className='searchBar'
                    type="text"
                    id='searchBar'
                    placeholder='Search for venues or events'
                    value={searchQuery}
                    onChange={handleChange}
                />
                <button className='searchBtn' type='submit'>Search</button>
            </form>
            <div className="headerLinks">
                <button onClick={() => navigate('/')}>VENUES</button>
                <button onClick={() => navigate('/events')}>EVENTS</button>
                {loggedInUser ? (
                    <div className="userMenu">
                        <h3 onClick={toggleUserMenu}>{userData.user_name} Photo</h3>
                            {userMenu && (
                                <ul className="dropdown">
                                    <li onClick={() => navigate('/userSettings')}>Settings</li>
                                    <li onClick={localStorage.removeItem('loggedInUser')}>Logout</li>
                                </ul>
                            )}
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')}>Log In</button>
                )}
            </div>
        </div>
    )
}