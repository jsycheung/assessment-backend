const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {
  getCompliment,
  getFortune,
  createQuote,
  updateQuote,
  deleteQuote,
} = require("./controller");

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.post("/api/quotes", createQuote);
app.put("/api/quotes", updateQuote);
app.delete("/api/quotes/:id", deleteQuote);

app.listen(4004, () => console.log("Server running on 4004"));
