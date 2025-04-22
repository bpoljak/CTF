import express from "express";
const router = express.Router();

const correctFlag = "flag{view_source_is_cool}";

router.get("/", (req, res) => {
  res.render("level1", { error: null });
});

router.post("/", (req, res) => {
  const submittedFlag = req.body.flag;

  if (submittedFlag === correctFlag) {
    res.cookie("level1_passed", true);
    return res.redirect("/level2");
  }

  res.render("level1", { error: "Incorrect flag. Try again." });
});

export default router;
