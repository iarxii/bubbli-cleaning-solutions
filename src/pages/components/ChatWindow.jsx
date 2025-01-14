import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chat-window ${isOpen ? "open" : "collapsed"}`}>
      <div className="chat-header" onClick={toggleChatWindow}>
        <h2><FontAwesomeIcon icon={faHeadset} />  Need assistance?</h2>
      </div>
      {isOpen && (
        <div className="chat-content">
          <div className="chat-messages">{/* Chat messages content */}</div>
          <div className="chat-messenger">
            <input type="text" placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  chatWindow: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "20px",
    textAlign: "center",
    marginTop: "40px",
  },
  chatWindowTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#E44548",
  },
};

export default ChatWindow;
