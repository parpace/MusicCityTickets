import './header.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Levenshtein from 'fast-levenshtein'
import MusicCity_Logo from '../assets/MusicCity_Logo.png'

export default function Header () {
    const [searchQuery, setSearchQuery] = useState('')
    const [userData, setUserData] = useState({})
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [formState, setFormState] = useState({ username: '', password: '', error: '' })
    const [users, setUsers] = useState([])
    const loginFormRef = useRef(null)
    const userMenuRef = useRef(null)
    const navigate = useNavigate()
    const loggedInUser = localStorage.getItem('loggedInUser')

    useEffect(() => {
        if (loggedInUser) {
            const getUserData = async (userId) => {
                const response = await axios.get(`http://127.0.0.1:8000/users/${userId}`)
                // console.log(response)
                setUserData(response.data)
            }
            getUserData(loggedInUser)
        }

        const getUsers = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/users/`)
                setUsers(response.data)
                // console.log(response.data)
            } catch (error) {
                console.error('Could not find users', error)
            }
        }
        getUsers()
    }, [loggedInUser])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false)
            }
            if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
                setShowLoginForm(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchSubmit = async (e) => {
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
                navigate(`/venue/${findVenue.id}`)
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
        setShowUserMenu(!showUserMenu)
    }

    const toggleLoginForm = () => {
        setShowLoginForm(!showLoginForm)
    }

    const handleLoginChange = (e) => {
        setFormState({ ...formState, [e.target.id]: e.target.value, error: '' })
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const user = users.find(user => user.user_name === formState.username)
        if (!user) {
            setFormState({ ...formState, error: 'Username does not exist' })
            return
        }
        if (user.password !== formState.password) {
            setFormState({ ...formState, error: 'Incorrect Password' })
            return
        }
        else {
            localStorage.setItem('loggedInUser', user.id)
            setShowLoginForm(false)
        }
        // console.log(user.id)
    }

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser')
        setShowUserMenu(false)
    }
    
    return (
        <div className="header">
            <img src={MusicCity_Logo} alt="Music City Tickets" className="logo" onClick={() => navigate('/')}/>
            <form className="searchForm" onSubmit={handleSearchSubmit}>
                <input className='searchBar'
                    type="text"
                    id='searchBar'
                    placeholder='Search for venues or events'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className='searchBtn' type='submit'>Search</button>
            </form>
            <div className="headerLinks">
                <button onClick={() => navigate('/')}>VENUES</button>
                <button onClick={() => navigate('/events')}>EVENTS</button>
                {loggedInUser ? (
                    <div className="userMenu" ref={userMenuRef}>
                        <img onClick={toggleUserMenu}src={userData.user_photo}/>
                            {showUserMenu && (
                                <ul className="dropdown">
                                    <li onClick={() => navigate('/userSettings')}>Settings</li>
                                    <li onClick={handleLogout}>Logout</li>
                                </ul>
                            )}
                    </div>
                ) : (
                    <button onClick={toggleLoginForm}>Log In</button>
                )}
                {showLoginForm && (
                    <div className="loginOverlay" ref={loginFormRef}>
                        <form className="loginForm" onSubmit={handleLoginSubmit}>
                            <input type="text" id="username" placeholder="User Name" onChange={handleLoginChange} />
                            <input type="password" id="password" placeholder="Enter your password" onChange={handleLoginChange} />
                            <button type="submit">Log in</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}