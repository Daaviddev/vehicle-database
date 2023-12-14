import messagePopupStore from '../stores/MessagePopupStore';

export const showMessagePopup = (text, type) => {
  messagePopupStore.showMessagePopup(text, type);
};
