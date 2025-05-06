import express from "express";
const router = express.Router();

const flag = "flag{template_injection_success}";

router.get("/", (req, res) => {
  if (!req.cookies.level11_passed) {
    return res.status(403).send("Prvo riješi razinu 11.");
  }

  res.render("level12", { error: null });
});

router.post("/", (req, res) => {
  const name = req.body.name;
  res.render("level12_greeting", { name, flag });
});

router.post("/verify", (req, res) => {
  res.cookie("level12_passed", true);
  res.redirect("/level13");
});

export default router;
