function requireAuth(req, res, next) {
  const authHeader = req.header("authorization") || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Missing bearer token" });
  }

  const [orgId, userId] = token.split(":");
  if (!orgId || !userId) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  if (req.tenant?.orgId !== orgId) {
    return res.status(403).json({ message: "Tenant mismatch in token" });
  }

  req.auth = { orgId, userId };
  return next();
}

module.exports = {
  requireAuth
};
