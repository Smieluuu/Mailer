import React, { useState } from "react";
import "./Mailbox.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import MailHome from "../../components/mailHome/MailHome";
import MailUnread from "../../components/mailUnread/MailUnread";
import MailRead from "../../components/mailRead/MailRead";
import MailOutgoing from "../../components/mailOutgoing/MailOutgoing";

const Mailbox = () => {
  const [showHome, setShowHome] = useState(true);
  const [showOutgoing, setShowOutgoing] = useState(false);
  const [showRead, setShowRead] = useState(false);
  const [showUnread, setShowUnread] = useState(false);

  const handleHomeClick = () => {
    setShowHome(true);
    setShowOutgoing(false);
    setShowRead(false);
    setShowUnread(false);
  };

  const handleUnreadClick = () => {
    setShowUnread(true);
    setShowHome(false);
    setShowRead(false);
    setShowOutgoing(false);
  };

  const handleReadClick = () => {
    setShowRead(true);
    setShowHome(false);
    setShowOutgoing(false);
    setShowUnread(false);
  };

  const handleOutgoingClick = () => {
    setShowOutgoing(true);
    setShowHome(false);
    setShowRead(false);
    setShowUnread(false);
  };

  return (
    <div className="App">
      <Sidebar
        handleHomeClick={handleHomeClick}
        handleUnreadClick={handleUnreadClick}
        handleReadClick={handleReadClick}
        handleOutgoingClick={handleOutgoingClick}
      />
      {showHome && <MailHome />}
      {showOutgoing && <MailOutgoing />}
      {showRead && <MailRead />}
      {showUnread && <MailUnread />}
    </div>
  );
};

export default Mailbox;
