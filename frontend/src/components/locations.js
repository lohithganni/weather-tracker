import { useEffect, useState } from "react";
import MyLocationWeather from "./mylocationweathe";

const Locations = () => {
  const [username, setUsername] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!username) {
        setLoading(false);
        return;
      }
      try {
        console.log('Attempting to fetch locations');
        const response = await fetch(`http://localhost:5000/api/v1/weather/user?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setLocations(data || []);
        } else {
          const errorData = await response.json();
          console.error('Fetch failed:', errorData.error);
          alert('Fetch failed: ' + errorData.error);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
        alert('An error occurred while trying to fetch locations.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h3>Saved Locations</h3>
        <div className="wrapper">
          {locations.map((location, index) => (
            <div className="cards" key={index}>
              <MyLocationWeather location={location} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Locations;
