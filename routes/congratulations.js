import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.cookies.level9_passed) {
    return res.status(403).send("Access denied. Solve Level 9 first.");
  }

  res.render("congratulations");
});

export default router;
