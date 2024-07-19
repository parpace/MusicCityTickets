import './Search.css'
import { useLocation, Link } from 'react-router-dom'

export default function Search () {
    const location = useLocation()
    const { searchQuery, potentialMatches } = location.state || {}

    return (
        <div className="search-container">
            <h3>We couldn't find any venues or events matching "{searchQuery}". Were you looking for one of these?</h3>
            {potentialMatches && potentialMatches.length > 0 ? (
                <div className="venues-grid">
                    {potentialMatches.map(match => (
                        <Link to={match.type === 'venue' ? `/venues/${match.id}` : `/events/${match.id}`} key={`${match.type}-${match.id}`}>
                            <div className="venue-card">
                                {match.type === 'venue' ? (
                                    <>
                                        <h2>{match.venue_name}</h2>
                                        <p>{match.address}</p>
                                        <h4 className="venue-description">{match.venue_description}</h4>
                                    </>
                                ) : (
                                    <>
                                        <h2>{match.event_name}</h2>
                                        <p>Performer: {match.performer_name}</p>
                                        <p>Performer Description: {match.performer_description}</p>
                                        <p>Date: {match.event_dateAndTime}</p>
                                        <p>Price: ${match.event_price}</p>

                                    </>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No potential matches found. You can try a new search, or click to view a list of all of our <Link to="/venues">venues</Link> or <Link to="/events">events</Link></p>
            )}
        </div>
    )
    
}