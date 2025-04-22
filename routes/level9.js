import express from "express";
const router = express.Router();

const comments = [];

router.get("/", (req, res) => {
  if (!req.cookies.level8_passed) {
    return res.status(403).send("Access denied. Solve Level 8 first.");
  }

  res.render("level9", { comments, flag: null, error: null });
});

router.post("/", (req, res) => {
  const { name, message, flagInput } = req.body;

  if (flagInput) {
    if (flagInput === "flag{xss_from_the_inside}") {
      res.cookie("level9_passed", true);
      return res.redirect("/congratulations");
    }

    return res.render("level9", {
      comments,
      flag: null,
      error: "Incorrect flag. Try again."
    });
  }

  comments.push({ name, message });

  let flag = null;
  if (name.toLowerCase() === "admin" && message.includes("<script>")) {
    flag = "flag{xss_from_the_inside}";
  }

  res.render("level9", { comments, flag, error: null });
});

export default router;
