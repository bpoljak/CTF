import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.cookies.level2_passed) {
    return res.status(403).send("Access denied. Solve Level 2 first.");
  }

  res.render("level3", { error: null });
});

router.post("/", (req, res) => {
  const submittedFlag = req.body.flag;
  const correctFlag = "flag{console_logs_never_lie}";

  if (submittedFlag === correctFlag) {
    res.cookie("level3_passed", true);
    return res.redirect("/level4");
  }

  res.render("level3", { error: "Incorrect flag. Try again." });
});

export default router;
