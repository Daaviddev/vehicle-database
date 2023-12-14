import { makeObservable, observable, action } from 'mobx';

class MessagePopupStore {
  queue = []; // Queue to store messages
  message = { text: '', type: '' }; // Current message

  constructor() {
    makeObservable(this, {
      queue: observable,
      message: observable,
      showMessagePopup: action,
      hideMessagePopup: action,
      nextMessage: action,
    });
  }

  // Add a new message to the queue
  showMessagePopup(text, type = 'error') {
    this.queue.push({ text, type });
    // If there's no current message, display the next one
    if (!this.message.text) {
      this.nextMessage();
    }
  }

  // Show the next message in the queue
  nextMessage() {
    if (this.queue.length > 0) {
      this.message = this.queue.shift(); // Dequeue the next message
    } else {
      this.message = { text: '', type: '' }; // Reset if queue is empty
    }
  }

  // Hide the current message and show the next one (if any)
  hideMessagePopup() {
    this.nextMessage();
  }
}

const messagePopupStore = new MessagePopupStore();
export default messagePopupStore;
