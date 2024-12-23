const jwtProvider = require('../config/jwtProvider.js');
const userService = require("../Services/User.service/user.service.js");

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(404).send({ error: "Token not found" });
        }

        const userId = jwtProvider.getUserIdFromToken(token);

        // Ensure you await the user service call
        const user = await userService.findUserById(userId);

        if (!user) {
            return res.status(401).send({ error: "User not found or unauthorized" });
        }

        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = authentication;
