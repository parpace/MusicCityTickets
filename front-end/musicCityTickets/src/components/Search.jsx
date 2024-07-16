import { useLocation, Link } from 'react-router-dom'

export default function Search() {
    const location = useLocation()
    const { searchQuery, potentialMatches } = location.state || {}

    return (
        <div>
            <h3>We couldn't find any venues or events matching "{searchQuery}". Were you looking for one of these?</h3>
            <ul>
                {potentialMatches && potentialMatches.length > 0 ? (
                    potentialMatches.map(match => (
                        <li key={`${match.type}-${match.id}`}>
                            {match.type === 'venue' ? (
                                <Link to={`/venues/${match.id}`}>{match.venue_name}</Link>
                            ) : (
                                <Link to={`/events/${match.id}`}>{match.event_name}</Link>
                            )}
                        </li>
                    ))
                ) : (
                    <li>No potential matches found. You can try a new search, or click to view a list of all of our <Link to="/venues">venues</Link> or <Link to="/events">events</Link></li>
                )}
            </ul>
        </div>
    )
}