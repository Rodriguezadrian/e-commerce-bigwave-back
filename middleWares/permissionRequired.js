const checkRole = {
  admin: async (req, res, next) => {
    try {
      if (req.auth.rol === "admin") next();
    } catch (err) {
      console.error(err);
      return res.send("Access denied: you don't have permission to access");
    }
  },
  client: async (req, res, next) => {
    try {
      if (req.auth.rol === "client") next();
    } catch (err) {
      console.error(err);
      return res.send("Access denied: you don't have permission to access");
    }
  },
};

module.exports = checkRole;
