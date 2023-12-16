import messagePopupStore from '../stores/MessagePopupStore';

const showMessagePopup = (text, type) => {
  messagePopupStore.showMessagePopup(text, type);
};

export default showMessagePopup;
