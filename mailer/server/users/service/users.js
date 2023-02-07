const User = require("./../../models/user");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.create({
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
    });

    console.log("user", user);

    if (!user) return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(304).json({ success: false });
  }
};

const getUsers = async (req, res) => {
  const token = req.query.token;
  const isValid = jwt.verify(token, "admin4123");

  if (!isValid) return res.status(401).json({ success: false });

  try {
    const users = await User.find({ admin: false });

    if (!users) return res.status(200).json({ success: false, users: users });

    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndDelete({ _id: id });
    if (!user)
      return res.status(200).json({ success: false, msg: "User not found" });
    return res
      .status(200)
      .json({ success: true, msg: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};

module.exports = {
  addUser,
  getUsers,
  deleteUser,
};
