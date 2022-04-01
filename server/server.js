const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("../server/db/db-connection.js");

const app = express();

const PORT = 5005;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get("/", (req, res) => {
  res.json({ message: "Hello from My ExpressJS" });
});

// gets 1 random word from the DB
app.get("/api/words", cors(), async (req, res) => {
  try {
    const { rows: words } = await db.query(
      "SELECT word FROM words ORDER BY RANDOM() LIMIT 1;"
    );
    res.send(words);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// get scores
app.get("/api/winners", cors(), async (req, res) => {
  try {
    const { rows: highscores } = await db.query(
      "SELECT * FROM scores ORDER BY score LIMIT 5;"
    );
    res.send(highscores);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// post to scores
app.post("/api/winners", cors(), async (req, res) => {
  const newScore = {
    name: req.body.name,
    score: req.body.score,
  };
  console.log([newScore.name, newScore.score]);
  const result = await db.query(
    "INSERT INTO scores (name, score, CreationTimeStamp) VALUES($1, $2, current_timestamp) RETURNING *",
    [newScore.name, newScore.score]
  );
  console.log("Post score row 0", result.rows[0]);
  res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
