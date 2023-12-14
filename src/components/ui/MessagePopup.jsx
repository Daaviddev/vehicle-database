import PropTypes from 'prop-types';

import '../../styles/MessagePopup.css';

const MessagePopup = ({ message, onClose }) => {
  if (!message.text) return null;

  const popupStyle = `message-popup ${message.type}`;

  return (
    <div className={popupStyle}>
      <span>{message.text}</span>
      <button onClick={onClose}>x</button>
    </div>
  );
};

MessagePopup.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default MessagePopup;
