import express from "express";
import sqlite3 from "sqlite3";

const router = express.Router();
const db = new sqlite3.Database(":memory:");

// Inicijalna "baza"
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, isAdmin INTEGER)");
  db.run("INSERT INTO users (name, isAdmin) VALUES ('User1', 0)");
  db.run("INSERT INTO users (name, isAdmin) VALUES ('User2', 0)");
  db.run("INSERT INTO users (name, isAdmin) VALUES ('Admin', 1)");
});

router.get("/", (req, res) => {
    if (!req.cookies.level7_passed) {
      return res.status(403).send("Access denied. Solve Level 7 first.");
    }
  
    const { name, flagInput } = req.query;
  
    // Ako je unesen flag
    if (flagInput) {
      if (flagInput === "flag{classic_sql_injection}") {
        res.cookie("level8_passed", true);
        return res.redirect("/level9");
      } else {
        return res.render("level8", {
          users: null,
          error: "Incorrect flag. Try again."
        });
      }
    }
  
    if (!name) {
      return res.render("level8", { users: null, error: null });
    }
  
    const query = `SELECT * FROM users WHERE name = '${name}'`;
  
    db.all(query, [], (err, rows) => {
      if (err) {
        return res.render("level8", { users: null, error: "SQL error." });
      }
  
      res.render("level8", {
        users: rows,
        error: null
      });
    });
  });
  

export default router;
