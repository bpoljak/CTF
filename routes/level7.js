import express from "express";
const router = express.Router();

// "Baza" korisnika
const users = {
  1: { name: "Admin", isAdmin: true },
  2: { name: "User1", isAdmin: false },
  3: { name: "User2", isAdmin: false }
};

router.get("/", (req, res) => {
  if (!req.cookies.level6_passed) {
    return res.status(403).send("Access denied. Solve Level 6 first.");
  }

  res.render("level7_intro");

});

router.get("/profile", (req, res) => {
  const { user_id, flagInput } = req.query;
  const user = users[user_id];

  if (!user) {
    return res.status(404).send("User not found.");
  }

  if (user.isAdmin && flagInput === "flag{dont_trust_your_users}") {
    res.cookie("level7_passed", true);
    return res.redirect("/level8");
  }

  res.render("level7_profile", {
    name: user.name,
    isAdmin: user.isAdmin,
    flag: user.isAdmin ? "flag{dont_trust_your_users}" : null,
    showFlagForm: user.isAdmin
  });
});


export default router;
