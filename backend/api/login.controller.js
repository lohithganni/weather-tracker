import WeatherDAO from "../dao/weatherDAO.js";

export default class LoginCtrl {
    static async apiLogin(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: "Username and password are required" });
            }
            const userexist =await WeatherDAO.getUser(username);
            const existingUser = await WeatherDAO.loginUser(username, password);

            if (existingUser) {
                return res.status(200).json({ status: "User found successfully" });
            } else if(userexist && !existingUser) {
                return res.status(404).json({ error: "incorrect password" });
            }else{
                return res.status(404).json({error: "user not found"})
            }

        } catch (e) {
            console.error(`Unable to find user: ${e}`);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
