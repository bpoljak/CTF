import express from "express";
const router = express.Router();

const users = {}; // memorijsko spremanje korisnika

router.get("/register", (req, res) => {
  if (!req.cookies.level5_passed) {
    return res.status(403).send("Access denied. Solve Level 5 first.");
  }

  res.render("level6_register", { error: null });
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("level6_register", { error: "All fields are required." });
  }

  if (users[email]) {
    return res.render("level6_register", { error: "User already exists." });
  }

  users[email] = { password, role: "user" };
  res.redirect("/level6/login");
});

router.get("/login", (req, res) => {
  res.render("level6_login", { error: null, flag: null });
});

router.post("/login", (req, res) => {
  const { email, password, flagInput } = req.body;

  // Ako je već logiran kao admin i šalje samo flag:
  if (req.cookies.level6_logged_admin && flagInput) {
    const correctFlag = "flag{escalation_by_interception}";
    if (flagInput === correctFlag) {
      res.cookie("level6_passed", true);
      return res.redirect("/level7");
    }

    return res.render("level6_login", {
      flag: "flag{escalation_by_interception}",
      error: "Incorrect flag. Try again."
    });
  }

  // Inače pokušaj logina
  const { role } = req.body;
  if (!users[email] || users[email].password !== password) {
    return res.render("level6_login", { error: "Invalid credentials", flag: null });
  }

  const actualRole = role || users[email].role;

  if (actualRole === "admin") {
    res.cookie("level6_logged_admin", true);
    return res.render("level6_login", {
      flag: "flag{escalation_by_interception}",
      error: null
    });
  }

  res.render("level6_login", {
    error: "You are logged in as regular user. Nothing to see here.",
    flag: null
  });
});


export default router;
