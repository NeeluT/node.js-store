const redisDB = require("redis");

// Create the Redis client
const redisClient = redisDB.createClient({
    socket: {
        host: "127.0.0.1", // Redis host
        port: 6379,        // Redis port
    },
});

(async () => {
    try {
        // Connect to Redis
        await redisClient.connect();

        console.log("Connected to Redis and ready to use.");
    } catch (err) {
        console.error("Redis Error during connection:", err.message);
    }
})();

// Attach event listeners
redisClient.on("error", (err) => {
    console.error("Redis Error:", err.message);
});

module.exports = redisClient;
