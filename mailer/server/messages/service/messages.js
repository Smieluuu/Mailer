const Message = require("../../models/message");
const jwt = require("jsonwebtoken");

// TODO:
const addMessage = async (req, res) => {
  const data = req.body;
  const token = req.query.token;
  const isValid = jwt.verify(token, "admin4123");
  const userEmail = isValid.email;

  data.sender = userEmail;

  if (!isValid) return res.status(401).json({ success: false });

  try {
    const message = await Message.create(data);

    console.log("message", message);

    if (!message) return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(304).json({ success: false });
  }
};

// TODO:
const getMessages = async (req, res) => {
  const token = req.query.token;
  const isValid = jwt.verify(token, "user4123");

  if (!isValid) return res.status(401).json({ success: false });

  try {
    const userEmail = isValid.email;
    const usersMessages = await Message.find({ reciever: userEmail });

    console.log("usersMessages", usersMessages);

    return res.status(200).json({ success: true, mails: usersMessages });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};

const getMessagesRead = async (req, res) => {
  const token = req.query.token;
  const isValid = jwt.verify(token, "user4123");

  if (!isValid) return res.status(401).json({ success: false });

  try {
    const userEmail = isValid.email;
    const usersMessages = await Message.find({
      reciever: userEmail,
      read: true,
    });

    console.log("getMessagesRead", usersMessages);

    return res.status(200).json({ success: true, mails: usersMessages });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};

const getMessagesUnread = async (req, res) => {
  const token = req.query.token;
  const isValid = jwt.verify(token, "user4123");

  if (!isValid) return res.status(401).json({ success: false });

  try {
    const userEmail = isValid.email;
    const usersMessages = await Message.find({
      reciever: userEmail,
      read: false,
    });

    console.log("getMessagesRead", usersMessages);

    return res.status(200).json({ success: true, mails: usersMessages });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};

const getMessagesOutgoing = async (req, res) => {
  const token = req.query.token;
  const isValid = jwt.verify(token, "user4123");

  if (!isValid) return res.status(401).json({ success: false });

  try {
    const userEmail = isValid.email;
    const usersMessages = await Message.find({ sender: userEmail });

    console.log("getMessagesOutgoing", usersMessages);

    return res.status(200).json({ success: true, mails: usersMessages });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};

// TODO:
const updateMessage = async (req, res) => {
  const messageId = req.params.id;
  const token = req.query.token;
  const isValid = jwt.verify(token, "user4123");

  if (!isValid) return res.status(401).json({ success: false });

  try {
    const message = await Message.findByIdAndUpdate(
      messageId,
      { $set: { read: true } },
      { new: true }
    );

    console.log("message", message);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};

// TODO:
const deleteMessage = async (req, res) => {
  const id = req.params.id;
  try {
    const message = await Message.findOneAndDelete({ _id: id });
    if (!message)
      return res.status(200).json({ success: false, msg: "Message not found" });

    return res
      .status(200)
      .json({ success: true, msg: "Message deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};

module.exports = {
  addMessage,
  getMessages,
  getMessagesRead,
  getMessagesUnread,
  getMessagesOutgoing,
  updateMessage,
  deleteMessage,
};
