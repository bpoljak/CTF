import express from "express";
const router = express.Router();

const correctFlag = "flag{hidden_but_not_safe}";

router.get("/", (req, res) => {
  if (!req.cookies.level1_passed) {
    return res.status(403).send("Access denied. Solve Level 1 first.");
  }

  res.render("level2", { error: null });
});

router.post("/", (req, res) => {
  const submittedFlag = req.body.flag;

  if (submittedFlag === correctFlag) {
    res.cookie("level2_passed", true);
    return res.redirect("/level3");
  }

  res.render("level2", { error: "Incorrect flag. Try again." });
});

export default router;
