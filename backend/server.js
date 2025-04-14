const express = require("express");
const db = require("./config/database");
const { generateResponse } = require("./utils/generateResponse");
const redisClient = require("./config/redis");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// redploy backend

app.use(cors());
app.use(express.json());

app.get("/api/customers/getall", async (req, res) => {
  const { page = 1, page_size = 10 } = req.query;
  try {
    const cacheKey = `/customers/getall:page=${page}:page_size=${page_size}`;
    const totalCountCacheKey = `/customers/getall:totalCount`;
    const cachedTotalCount = await redisClient.get(totalCountCacheKey);
    let totalCount;

    // check for total count
    if (cachedTotalCount) {
      totalCount = JSON.parse(cachedTotalCount);
    } else {
      const totalCountData = await db.query(`SELECT COUNT(*) FROM customer`);
      await redisClient.setex(
        totalCountCacheKey,
        300,
        JSON.stringify(totalCountData.rows[0].count)
      );
    }

    // fetch customer
    const result = await db.query(
      `SELECT first_name || ' ' || last_name as name, email, address, activebool as status, create_date as joined_date 
       FROM customer c
       LEFT JOIN address a ON c.address_id = a.address_id
       LIMIT $1 OFFSET $2`,
      [page_size, Number(page) * Number(page_size)]
    );

    // cache here
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      return res
        .status(200)
        .json(
          generateResponse(
            200,
            "customers fetched successfully from cache",
            data,
            page,
            page_size,
            totalCount
          )
        );
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          `customers fetched successfully from db`,
          result,
          page,
          page_size,
          totalCount
        )
      );

    await redisClient.setex(cacheKey, 300, JSON.stringify(result));
  } catch (err) {
    console.log("err fetching customers", err);
    res.status(500).send({ message: err || "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`api is running on port ${PORT}`);
});
