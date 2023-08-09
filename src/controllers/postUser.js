const { User } = require("../DB_connection");

const postUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) res.status(400).json({ message: "Faltan datos" });

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { email, password },
    });

    if (created) {
      return res.status(200).json({ user });
    } else {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
