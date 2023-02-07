import { React, useState, useEffect } from "react";
import "./MailOutgoing.scss";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const MailOutgoing = () => {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await axios.get(
        "/api/messages/getMessagesOutgoing?token=" +
          sessionStorage.getItem("token")
      );

      if (response.data.success) {
        setMessages(response.data.mails);
      }
    } catch (error) {
      alert("Error");
    }
  };

  console.log(messages);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="mail-list">
      <div className="mail-home">
        <h1>Mailbox</h1>
        <ul className="mail-list">
          {messages.map((message) => (
            <li key={message.id} className="mail-item">
              <p>ID: {message._id}</p>
              <p>TYTUŁ: {message.title}</p>
              <p>CONTENT: {message.content}</p>
              <p>SENDER: YOU</p>
              <p>STATUS: {message.read ? "Read" : "Unread"}</p>
              <p>
                <AiFillDelete />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MailOutgoing;
