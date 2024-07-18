import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './detailpage.css';

const Detailpage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/get/id/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="detail-page">
      <h2>Restaurant Details</h2>
      {restaurant && (
        <div className="restaurant-container">
          <div className="main-details">
            <img src={restaurant.img_url} alt={restaurant.name} className="restaurant-image" />
            <h3>{restaurant.name}</h3>
            <p>Cuisines: {restaurant.cuisines}</p>
            <p>Location: {restaurant.location.address}, {restaurant.location.city}</p>
            <p>Rating: {restaurant.user_rating.aggregate_rating} ({restaurant.user_rating.rating_text})</p>
            <p>Cost for Two: {restaurant.cost_for_two}</p>
            <p>Menu: <a href={restaurant.menu_url} target="_blank" rel="noopener noreferrer">View Menu</a></p>
            <p>Book: <a href={restaurant.book_url} target="_blank" rel="noopener noreferrer">Book a Table</a></p>
          </div>
          <div className="zomato-events">
            <h3>Events:</h3>
            {restaurant.zomato_events && restaurant.zomato_events.length > 0 ? (
              <ul>
                {restaurant.zomato_events.map((event, index) => (
                  <li key={index}>
                    <strong>{event.event?.title}</strong><br />
                    {event.event?.display_date}<br />
                    {event.event?.display_time}<br />
                    {event.event?.photos && event.event.photos.length > 0 && (
                      <img src={event.event.photos[0].photo.thumb_url} alt="Event Thumbnail" />
                    )}
                    {event.event?.description && (
                      <p>{event.event.description}</p>
                    )}
                    {event.event?.share_url && (
                      <a href={event.event.share_url} target="_blank" rel="noopener noreferrer">Event Link</a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No events currently available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detailpage;
