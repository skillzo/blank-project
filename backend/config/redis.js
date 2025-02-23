const Redis = require("ioredis");

const redisClient = new Redis(); // Connects to Redis at localhost:6379

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

module.exports = redisClient;
