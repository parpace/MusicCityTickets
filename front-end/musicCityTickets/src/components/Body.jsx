import Venues from './Venues'
import Events from './Events'
import VenueDetails from './VenueDetails'
import EventDetails from './EventDetails'
import { Route, Routes } from 'react-router-dom'

export default function Body () {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Venues/>}/>
                <Route path='/events' element={<Events/>}/>
                <Route path='/events/:selectedVenue' element={<VenueDetails/>}/>
                <Route path='/events/:selectedEvent' element={<EventDetails/>}/>
            </Routes>
        </div>
    )
}