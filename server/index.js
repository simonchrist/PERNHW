const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); 

//ROUTES//
//create hw

app.post("/hw", async (req, res) => {
  try {
    const { description } = req.body;
    const newHW = await pool.query(
      "INSERT INTO hw (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newHW.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all hw

app.get("/hw", async (req, res) => {
  try {
    const allHW = await pool.query("SELECT * FROM hw");
    res.json(allHW.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a hw

app.get("/hw/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const HW = await pool.query("SELECT * FROM hw WHERE hw_id = $1", [
      id
    ]);

    res.json(hw.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a hw

app.put("/hw/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateHW = await pool.query(
      "UPDATE hw SET description = $1 WHERE hw_id = $2",
      [description, id]
    );

    res.json("hw was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a hw

app.delete("/hw/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteHW = await pool.query("DELETE FROM hw WHERE hw_id = $1", [
      id
    ]);
    res.json("hw was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});