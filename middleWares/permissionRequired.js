const checkRole = {
  admin: async (req, res, next) => {
  
    try {
      if (req.auth.isAdmin) {
        next();
      } else {
        res.send("Access denied: you don't have permission to access");
      }
    } catch (err) {
      console.error(err);
      return res.send("Access denied: you don't have permission to access");
    }
  },
  client: async (req, res, next) => {
    try {
      if (!req.auth.isAdmin) next();
    } catch (err) {
      console.error(err);
      return res.send("Access denied: you don't have permission to access");
    }
  },
};

module.exports = checkRole;
