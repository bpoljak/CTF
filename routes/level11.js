import express from "express";
const router = express.Router();

const correctFlag = "flag{password}"; // Hash: 5f4dcc3b5aa765d61d8327deb882cf99

router.get("/", (req, res) => {
  if (!req.cookies.level10_passed) {
    return res.status(403).send("Prvo riješi razinu 10.");
  }

  res.render("level11", {
    hash: "5f4dcc3b5aa765d61d8327deb882cf99",
    error: null,
    success: false
  });
});

router.post("/", (req, res) => {
  const { flagInput } = req.body;

  if (flagInput.trim().toLowerCase() === correctFlag) {
    res.cookie("level11_passed", true);
return res.redirect("/level12");
  }

  res.render("level11", {
    hash: "5f4dcc3b5aa765d61d8327deb882cf99",
    error: "Netočan flag. Jesi li siguran da si hash ispravno dešifrirao?",
    success: false
  });
});

export default router;
