let info;

export default class WeatherDAO {
    static async injectDB(conn) {
        if (info) {
            return;
        }
        try {
            info = await conn.db(process.env.WEATHER_NS).collection("info");
        } catch (e) {
            console.error(`Unable to establish a collection handle in WeatherDAO: ${e}`);
        }
    }

    static async addUser(name, pass) {
        try {
            const user = {
                username: name,
                password: pass,
                saved_location: []
            };

            const insertResult = await info.insertOne(user);
            return insertResult;
        } catch (e) {
            console.error(`Unable to add user: ${e}`);
            return { error: "Failed to add user" };
        }
    }

    static async addLocation(username, location) {
        try {
            const updateResponse = await info.updateOne(
                { username: username },
                { $addToSet: { saved_location: location } }
            );

            if (updateResponse.matchedCount === 0) {
                return { error: "User not found" };
            }

            if (updateResponse.modifiedCount === 0) {
                return { message: "Location already exists in saved locations" };
            }

            return updateResponse;
        } catch (e) {
            console.error(`Unable to add location: ${e}`);
            return { error: "Failed to add location" };
        }
    }

    static async getUser(username) {
        try {
            return await info.findOne({ username: username });
        } catch (e) {
            console.error(`Unable to get user: ${e}`);
            return null;
        }
    }
    static async loginUser(username, password) {
        try {
            const user = await info.findOne({ username: username, password: password });
            return user;
        } catch (e) {
            console.error(`Unable to get user: ${e}`);
            return null;
        }
    }
    static async dltLocation(username, location) {
        try {
            const updateResponse = await info.updateOne(
                { username: username },
                { $pull: { saved_location: location } }
            );

            if (updateResponse.matchedCount === 0) {
                return { error: "User not found" };
            }

            if (updateResponse.modifiedCount === 0) {
                return { message: "Location not found in saved locations" };
            }

            return updateResponse;
        } catch (e) {
            console.error(`Unable to delete location: ${e}`);
            return { error: "Failed to delete location" };
        }
    }
}
