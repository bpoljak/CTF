import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = "secret";
const FLAG = "flag{jwt_is_not_always_safe}";

router.get("/", (req, res) => {
  if (!req.cookies.level13_passed) {
    return res.status(403).send("Prvo riješi razinu 13.");
  }

  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET);

      if (decoded.role === "admin") {
        return res.render("level14", {
          flag: FLAG,
          error: null
        });
      } else {
        return res.render("level14", {
          flag: null,
          error: "Samo admini mogu vidjeti flag."
        });
      }

    } catch (err) {
      return res.render("level14", {
        flag: null,
        error: "Nevažeći token."
      });
    }
  } else {
    // Postavi početni token za običnog korisnika
    const userToken = jwt.sign({ user: "student", role: "user" }, SECRET);
    res.cookie("token", userToken);
    res.render("level14", {
      flag: null,
      error: null
    });
  }
});

router.post("/", (req, res) => {
  const submittedFlag = req.body.flag;
  if (submittedFlag === FLAG) {
    res.cookie("level14_passed", true);
    return res.redirect("/level15");
  }

  res.render("level14", { flag: null, error: "Netočan flag. Pokušaj ponovno." });
});

export default router;
