function ensureAuth(req, res, next) {
  const adminUsername = "isaacpassnav";

  if (req.isAuthenticated && req.isAuthenticated()) {
    if (req.user && req.user.username === adminUsername) {
      return next();
    }

    // 🧑 Si NO es admin, solo permitir métodos GET
    if (req.method === "GET") {
      return next();
    }
    return res.status(403).json({
      message: "🚫 Access denied: Please contact Isaac Pasapera at pasapera279@gmail.com for permission."
    });
  }

  return res.status(401).json({
    message: "🚫 Unauthorized: Please log in with GitHub."
  });
}
module.exports = ensureAuth;
