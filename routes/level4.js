import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.cookies.level3_passed) {
    return res.status(403).send("Access denied. Solve Level 3 first.");
  }

  res.render("level4", { error: null });
});

router.post("/", (req, res) => {
  const submittedFlag = req.body.flag;
  const correctFlag = "flag{google_should_not_see_this}";

  if (submittedFlag === correctFlag) {
    res.cookie("level4_passed", true);
    return res.redirect("/level5");
  }

  res.render("level4", { error: "Incorrect flag. Try again." });
});

export default router;
