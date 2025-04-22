import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  // Postavi jasan hint u cookie
  res.cookie("hint", "Dodaj novi cookie: role=admin i refreshaj stranicu");

  const showFlag = req.cookies.role === "admin";
  const flag = showFlag ? "flag{cookies_have_roles}" : null;

  res.render("level5", { flag, error: null });
});

router.post("/", (req, res) => {
  const submittedFlag = req.body.flag;
  const correctFlag = "flag{cookies_have_roles}";

  if (submittedFlag === correctFlag) {
    res.cookie("level5_passed", true);
    return res.redirect("/level6/register");
  }

  const showFlag = req.cookies.role === "admin";
  const flag = showFlag ? correctFlag : null;

  res.render("level5", {
    flag,
    error: "Netočan flag. Pokušaj ponovno."
  });
});

export default router;
