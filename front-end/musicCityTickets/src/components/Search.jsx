import { useLocation, Link } from 'react-router-dom'

export default function Search () {
    const location = useLocation()
    const { searchQuery, potentialMatches } = location.state || {}

    return (
        <div>
            <h3>We couldn't find any venues or events matching "{searchQuery}". Were you looking for one of these?</h3>
            {potentialMatches && potentialMatches.length > 0 ? (
                potentialMatches.map(match => (
                    <div className="venues-grid" key={`${match.type}-${match.id}`}>
                            {match.type === 'venue' ? (
                                <Link to={`/venues/${match.id}`}>
                                    <div className="venue-card">
                                        <h2>{match.venue_name}</h2>
                                        <p>{match.address}</p>
                                        <h4 className="venue-description">{match.venue_description}</h4>
                                    </div>
                                </Link>
                            ) : (
                                <Link to={`/events/${match.id}`}>
                                    <div className="venue-card">
                                        <h2>{match.event_name}</h2>
                                        <h2>Performer: {match.performer_name}</h2>
                                        <h2>Performer Description: {match.performer_description}</h2>
                                        <h2>Date: {match.event_dateAndTime}</h2>
                                        <h2>Price: {match.event_price}$</h2>
                                        <img src={match.photo_url}/>
                                    </div>
                                </Link>
                            )}
                    </div>
                ))
            ) : (
                <li>No potential matches found. You can try a new search, or click to view a list of all of our <Link to="/venues">venues</Link> or <Link to="/events">events</Link></li>
            )}
        </div>
    )
}