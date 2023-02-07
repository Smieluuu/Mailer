import "./Sidebar.scss";
import {
  MdHome,
  MdMarkEmailUnread,
  MdMarkEmailRead,
  MdOutgoingMail,
  MdSend,
} from "react-icons/md";

const Sidebar = ({
  handleOutgoingClick,
  handleHomeClick,
  handleReadClick,
  handleUnreadClick,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar__item">
        <div className="sidebar__elem" onClick={handleHomeClick}>
          <MdHome className="sidebar__icon" />
          <h4>Domek</h4>
        </div>
      </div>
      <div className="sidebar__item">
        <div className="sidebar__elem" onClick={handleUnreadClick}>
          <MdMarkEmailUnread className="sidebar__icon" />
          <h4>Nieodebrane</h4>
        </div>
      </div>
      <div className="sidebar__item">
        <div className="sidebar__elem" onClick={handleReadClick}>
          <MdMarkEmailRead className="sidebar__icon" />
          <h4>Odebrane</h4>
        </div>
      </div>
      <div className="sidebar__item">
        <div className="sidebar__elem" onClick={handleOutgoingClick}>
          <MdOutgoingMail className="sidebar__icon" />
          <h4>Wysłane</h4>
        </div>
      </div>
      <div className="sidebar__item">
        <div className="sidebar__elem">
          <MdSend className="sidebar__icon" />
          <h4>Wyślij</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
