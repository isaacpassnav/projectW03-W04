function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    const allowedUsername = "isaacpassnav"; 

    if (req.user && req.user.username === allowedUsername) {
      return next();
    } else {
      return res.status(403).json({
        message: "🚫 Access denied: Please contact Isaac Pasapera at pasapera279@gmail.com for permission."
      });
    }
  }

  res.status(401).json({ message: "🚫 Unauthorized: Please log in with GitHub." });
}

module.exports = ensureAuth;

