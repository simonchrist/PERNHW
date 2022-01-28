const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); 

//ROUTES//
//create hw

app.post("/hws", async (req, res) => {
  try {
    const { description } = req.body;
    const newHw = await pool.query(
      "INSERT INTO hw (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newHw.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all hw

app.get("/hws", async (req, res) => {
  try {
    const allHw = await pool.query("SELECT * FROM hw");
    res.json(allHw.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a hw

app.get("/hws/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hw = await pool.query("SELECT * FROM hw WHERE hw_id = $1", [
      id
    ]);

    res.json(hw.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a hw

app.put("/hws/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateHw = await pool.query(
      "UPDATE hw SET description = $1 WHERE hw_id = $2",
      [description, id]
    );

    res.json("hw was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a hw

app.delete("/hws/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteHw = await pool.query("DELETE FROM hw WHERE hw_id = $1", [
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