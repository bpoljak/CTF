import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

import level1 from "./routes/level1.js";
app.use("/level1", level1);

import level2 from "./routes/level2.js";
app.use("/level2", level2);

import level3 from "./routes/level3.js";
app.use("/level3", level3);

import level4 from "./routes/level4.js";
app.use("/level4", level4);

import level5 from "./routes/level5.js";
app.use("/level5", level5);

import level6 from "./routes/level6.js";
app.use("/level6", level6);

import level7 from "./routes/level7.js";
app.use("/level7", level7);

import level8 from "./routes/level8.js";
app.use("/level8", level8);

import level9 from "./routes/level9.js";
app.use("/level9", level9);

import level10 from "./routes/level10.js";
app.use("/level10", level10);

import level11 from "./routes/level11.js";
app.use("/level11", level11);

import level12 from "./routes/level12.js";
app.use("/level12", level12);

import level13 from "./routes/level13.js";
app.use("/level13", level13);

import level14 from "./routes/level14.js";
app.use("/level14", level14);

import level15 from "./routes/level15.js";
app.use("/level15", level15);

import congratulations from "./routes/congratulations.js";
app.use("/congratulations", congratulations);

import home from "./routes/home.js";
app.use("/", home);

app.get("/supersecretpage", (req, res) => {
  res.send("Congrats! The flag is: flag{google_should_not_see_this}");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
