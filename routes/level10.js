import express from "express";
const router = express.Router();

const correctFlag = "pauc{this is our caesar}";

router.get("/", (req, res) => {
  if (!req.cookies.level9_passed) {
    return res.status(403).send("Prvo riješi razinu 9.");
  }

  res.render("level10", { error: null, success: false });
});

router.post("/", (req, res) => {
  const { flagInput } = req.body;

  if (flagInput.trim().toLowerCase() === correctFlag) {
    res.cookie("level10_passed", true);
    return res.redirect("/level11");
  }

  res.render("level10", {
    error: "Netočan flag. Pokušaj ponovno.",
    success: false,
  });
});

export default router;
