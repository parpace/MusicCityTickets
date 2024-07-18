import Venues from './Venues'
import Events from './Events'
import VenueDetails from './VenueDetails.jsx'
import EventDetails from './EventDetails'
import Search from './Search'
import Login from './Login'
import { Route, Routes } from 'react-router-dom'

export default function Body () {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Venues/>}/>
                <Route path='/events' element={<Events/>}/>
                <Route path="/Venue/:id" element={<VenueDetails/>}/>
                <Route path='/venues/:selectedVenue' element={<VenueDetails/>}/>
                <Route path='/events/:id' element={<EventDetails/>}/>
                <Route path="/events/edit/:id" element={<EventDetails/>}/>
                <Route path="/events/new" element={<EventDetails/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </div>
    )
}