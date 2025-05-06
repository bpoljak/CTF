import express from "express";
const router = express.Router();

const FLAG = "flag{you_listened_well}";

router.get("/", (req, res) => {
  if (!req.cookies.level12_passed) {
    return res.status(403).send("Prvo riješi razinu 12.");
  }

  res.render("level13", { error: null });
});

router.get("/ping", (req, res) => {
  res.setHeader("X-Secret-Flag", FLAG);
  res.send("Promatraj mrežu pomno...");
});

router.post("/", (req, res) => {
  const submittedFlag = req.body.flag;
  if (submittedFlag === FLAG) {
    res.cookie("level13_passed", true);
    return res.redirect("/level14");
  }

  res.render("level13", { error: "Netočan flag. Pokušaj ponovno." });
});

export default router;
