import { useEffect, useState } from "react";
import MyLocationWeather from "./mylocationweathe";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Dimensions } from 'react-native';

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
        const response = await fetch(`https://weather-tracker-8gkb.onrender.com/api/v1/weather/user?username=${username}`, {
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

  const scrollLeft = () => {
    let w = Dimensions.get('window').width;
    let a =  w;
    document.querySelector('.wrapper').scrollBy({
      left: -a,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    let w = Dimensions.get('window').width;
    let a = w;
    document.querySelector('.wrapper').scrollBy({
      left: a,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {
        username ? (
          <div>
            <h3 className="Heading my-3 mx-4">Saved Locations</h3>
            <div className="firstbox" style={{ position: 'relative' }}>
              <MdChevronLeft 
                size={60} 
                className="opacity-50 cursor-pointer" 
                style={{ 
                  backgroundColor: 'transparent', 
                  position: 'absolute', 
                  top: '50%', 
                  left: '-20px'  
                }} 
                onClick={scrollLeft} 
              />
              <div className="wrapper" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                {locations.slice().reverse().map((location, index) => (
                  <div key={index} style={{ display: 'inline-block', margin: '0 10px' }}>
                    <MyLocationWeather location={location} />
                  </div>
                ))}
              </div>
              <MdChevronRight 
                size={60} 
                className="opacity-50 cursor-pointer" 
                style={{ 
                  backgroundColor: 'transparent', 
                  position: 'absolute', 
                  top: '50%', 
                  
                  right: '-20px'  
                }} 
                onClick={scrollRight} 
              />
            </div>
          </div>
        ) : (
          <p>login to get locations</p>
        )
      }
    </>
  );
};

export default Locations;
