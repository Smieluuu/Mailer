const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.findOne({ email: data.email });

    if (!user) return res.status(200).json({ success: false });

    if (data.password === user.password && user.admin === true) {
      const token = jwt.sign({ email: user.email }, "admin4123");

      return res.status(200).json({ success: true, token });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};

const userLogin = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.findOne({ email: data.email });

    if (!user) return res.status(200).json({ success: false });

    if (data.password === user.password && user.admin === false) {
      const token = jwt.sign({ email: user.email }, "user4123");

      return res.status(200).json({ success: true, token });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};

module.exports = {
  adminLogin,
  userLogin,
};
