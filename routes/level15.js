import express from "express";
const router = express.Router();

const FLAG = "flag{your_useragent_is_the_key}";

router.get("/", (req, res) => {
    if (!req.cookies.level14_passed) {
      return res.status(403).send("Prvo riješi razinu 14.");
    }
  
    res.render("level15", { showFlag: false, error: null, flag: null });
  });
  

router.post("/", (req, res) => {
  const submittedFlag = req.body.flag;
  if (submittedFlag === FLAG) {
    res.cookie("level15_passed", true);
    return res.redirect("/congratulations");
  }

  res.render("level15", { showFlag: false, error: "Netočan flag." });
});

export default router;
