import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import '../../styles/MessagePopup.css';

const MessagePopup = observer(({ messagePopupStore }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (messagePopupStore.message.text) {
      setVisible(true);
      // Set up a timer to hide the popup
      const timer = setTimeout(() => {
        setVisible(false);
        messagePopupStore.hideMessagePopup();
      }, 5000);

      // Clear the timer if the component unmounts or the message changes
      return () => clearTimeout(timer);
    }
  }, [messagePopupStore.message]); // Depend only on message changes

  if (!visible || !messagePopupStore.message.text) {
    return null;
  }

  const { text, type } = messagePopupStore.message;
  const popupStyle = `message-popup ${type}`;

  return (
    <div className={popupStyle} role="alert" aria-live="assertive">
      <div className="message-content">
        <span className="message-type">{type.toUpperCase()}: </span>
        <span className="message-text">{text}</span>
      </div>
      <button
        className="close-button"
        onClick={() => messagePopupStore.hideMessagePopup()}
      >
        x
      </button>
    </div>
  );
});

MessagePopup.propTypes = {
  messagePopupStore: PropTypes.object.isRequired,
};

export default MessagePopup;
