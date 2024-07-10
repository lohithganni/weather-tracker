import WeatherDAO from "../dao/weatherDAO.js";

export default class UserInfoCtrl {

    static async apiAddUser(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ error: "Username and password are required" });
            }

            const existingUser = await WeatherDAO.getUser(username);
            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }

            const userResponse = await WeatherDAO.addUser(username, password);
            if (userResponse.error) {
                return res.status(500).json({ error: userResponse.error });
            }

            return res.status(201).json({ status: "User added successfully" });
        } catch (e) {
            console.error(`Unable to add user: ${e}`);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async apiGetUserLocation(req, res) {
        try {
            const username = req.query.username;
            if (!username) {
                return res.status(400).json({ error: "Username is required" });
            }

            const user = await WeatherDAO.getUser(username);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.json(user.saved_location);
        } catch (e) {
            console.error(`Unable to get user locations: ${e}`);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async apiAddLocation(req, res) {
        try {
            const { username, location } = req.body;
            if (!username || !location) {
                return res.status(400).json({ error: "Username and location are required" });
            }

            const locationResponse = await WeatherDAO.addLocation(username, location);
            if (locationResponse.error) {
                return res.status(500).json({ error: locationResponse.error });
            }
            if (locationResponse.message) {
                return res.status(200).json({ message: locationResponse.message });
            }

            return res.status(200).json({ status: "Location added successfully" });
        } catch (e) {
            console.error(`Unable to add location: ${e}`);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    static async apideleteLocation(req, res) {
        try {
            const { username, location } = req.body;
    
            if (!username || !location) {
                return res.status(400).json({ error: "Username and location are required" });
            }
    
            const userExist = await WeatherDAO.getUser(username);
    
            if (!userExist) {
                return res.status(404).json({ error: "User not found" });
            }
    
            const deleteResult = await WeatherDAO.dltLocation(username, location);
    
            if (deleteResult.error) {
                return res.status(500).json({ error: deleteResult.error });
            }
    
            if (deleteResult.modifiedCount === 0) {
                return res.status(400).json({ message: "Location not found in saved locations" });
            }
    
            return res.status(200).json({ message: "Location deleted successfully" });
    
        } catch (e) {
            console.error(`Unable to delete location: ${e}`);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
