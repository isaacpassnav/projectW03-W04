const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback",  passport.authenticate("github", { 
    failureRedirect: "/auth/login-failure",
    successRedirect: "/auth/login-success"
}));

router.get("/login-success", (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/login-failure");
  }
  res.redirect("/api-docs");
});
router.get("/login-failure", (req, res) =>{
    res.send("❌ Login failed. Please try again.")
});

router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    req.session.destroy(() => {
      res.redirect("/logout"); 
    });
  });
});

module.exports = router;