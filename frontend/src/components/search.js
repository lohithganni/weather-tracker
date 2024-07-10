import { useState, useEffect } from "react";
import Weather from "./weather";
import "bootstrap/dist/css/bootstrap.min.css";

const Search = () => {
  const [location, setLocation] = useState("");
  const [inputValue, setInputValue] = useState("");
  
  useEffect(() => {
    const fetchLocationFromIp = async () => {
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        if (!ipRes.ok) {
          throw new Error(`Failed to fetch IP address: ${ipRes.statusText}`);
        }
        const ipData = await ipRes.json();
        const ip = ipData.ip;

        const locationRes = await fetch(`http://ip-api.com/json/${ip}`);
        if (!locationRes.ok) {
          throw new Error(
            `Failed to fetch location data: ${locationRes.statusText}`
          );
        }
        const locationData = await locationRes.json();
        setLocation(`${locationData.city}, ${locationData.country}`);
      } catch (error) {
        console.error("Error fetching location by IP:", error);
      }
    };

    fetchLocationFromIp();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', inputValue);
    setLocation(inputValue)
  };

  return (
    <div className="container">
    
    <div className="container">
      <form className="form-inline" onSubmit={handleSearch}>
        <div className="searchbar my-2">
        <div className="form-group mb-2 mx-2">
          
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Search
        </button>
        
        </div>
      </form>
    </div>
    {location && <Weather location={location} />}
    </div>
  );
};

export default Search;
