import { useEffect, useState } from "react";
import MyLocationWeather from "./mylocationweathe";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Dimensions } from 'react-native'

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

  const scrollLeft = () => {
    let w = Dimensions.get('window').width;
    let a = w < 1024 ? w * 0.8 : w;
    document.querySelector('.wrapper').scrollBy({
      left: -a,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    let w = Dimensions.get('window').width;
    let a = w < 1024 ? w * 0.8 : w;
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
        username?(<div>
          <h3 className="Heading my-3 mx-4" >Saved Locations</h3>
          <div className="searchbar">
            <button className="button" >
              <MdChevronLeft size={30} className="opacity-50 cursor-pointer background-color-rgb(254, 250, 250)" onClick={scrollLeft} />
            </button>
            <div className="wrapper">
              {locations.slice().reverse().map((location, index) => (
                <div key={index}>
                  <MyLocationWeather location={location} />
                </div>
              ))}
            </div>
            <button className="button" >
              <MdChevronRight size={30} className="opacity-50 cursor-pointer" onClick={scrollRight}/>
            </button>
          </div>
        </div>):(<p>login to get locations</p>)
      }
    </>
  );
};

export default Locations;
