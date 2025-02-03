import { faHeadset, faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStore, faUser, faPaperPlane, faLightbulb, faWandMagicSparkles, faWandSparkles, faRobot } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// import media
import meshBackgroundRed from "../../assets/brand/mesh-red-1.png";
import profileImgPlaceholder from "../../assets/profile_avatar.jpg";
import agentAvatar from "../../assets/agents/tshepi/agent_avatar.jpeg";
import agentImageFull from "../../assets/agents/tshepi/agent_img_full.jpg";
import agentImageThumb from "../../assets/agents/tshepi/agent_img_thumb.jpg";

function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  // agent defaults
  const agent = {
    name: "Tshepi",
    avatar: agentAvatar,
    profileLink: "admin/agent/profile/tshepi",
  };

  const chatMessages = [];
  /* const chatMessages = [
    { sender: "agent", text: "Hi there! How can I assist you today?" },
    { sender: "user", text: "I need help with my order." },
    { sender: "agent", text: "Sure, I'd be happy to help. Can you provide me with your order number?" },
    { sender: "user", text: "It's 12345." },
    { sender: "agent", text: "Thank you. Let me check the status of your order." },
    { sender: "user", text: "Okay, I'll wait." },
    { sender: "agent", text: "Your order is on its way and should arrive by tomorrow." },
  ]; */

  const prompts = [
    "What are your store hours?",
    "Do you offer discounts?",
    "Can you recommend a cleaning product?",
    "How do I track my order?",
    "What are your return policies?",
  ];

  const handlePromptClick = (prompt) => {
    setChatInput(prompt);
    setShowPrompts(false);
  };

  return (
    <div className={`chat-window w-auto border-t-4 border-t-white ${isOpen ? "open" : "collapsed"}`}>
      <div className="chat-header shadow-lg" onClick={toggleChatWindow}>
        <h2 className="text-lg flex justify-center gap-x-1 align-middle">
          <FontAwesomeIcon icon={faHeadset} className="size-6" /> <span>Need Help?</span>
        </h2>
      </div>
      {isOpen && (
        <div style={styles.chatContent}>
          <div className="glassmorphic-less-30z">
            <div className="agentContainer p-4 pt-0" style={styles.chatWindow}>
              <div
                className="agentAvatar flex justify-center p-4"
                style={styles.agentAvatarContainer}
              >
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  style={styles.agentAvatarImg}
                  className="shadow-lg img-object-fit  animate__animated animate__slideInDown"
                />
              </div>
              <div className="agentName font-semibold rounded-xl text-[#fff]  bg-[#FB6F92] px-2 pt-4 pb-6 shadow-md animate__animated animate__slideInLeftz animate__lightSpeedInLeft animate__delay-1s animate__fast" style={{borderRadius: "0 20px 20px 20px",}}>
                <p className="text-center mb-4">Hi, my name is Tshepi.</p>
                <Link to={agent.profileLink} style={styles.viewProfileButton} className="shadow-md"><FontAwesomeIcon icon={faUser} /> View my profile</Link>
              </div>
            </div>
            {chatMessages.length !== 0 ? 
              <div className="chat-messages glassmorphic-less-30  animate__animated animate__slideInUp animate__delay-1s animate__fast" style={styles.chatMessages}>
                {chatMessages.map((bubble, index) => (
                  <div
                    key={index}
                    className={`chat-bubble shadow-md ${bubble.sender === "agent" ? "agent" : "user"}`}
                    style={bubble.sender === "agent" ? styles.agentBubble : styles.userBubble}
                  >
                    {bubble.sender === "agent" && (
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        style={styles.agentAvatarImgThumb}
                        className="shadow-lg border-2 border-white img-object-fit"
                      />
                    )}
                    <span className="text-start">{bubble.text}</span>
                  </div>
                ))}
              </div> : <span style={{fontSize:"10px",color:"#FB6F92",paddingBottom:"160px"}}>Send a message to chat with an agent</span>}
          </div>
          <div className="chat-messenger items-end" style={styles.chatMessenger}>
            <div className="relative w-full items-center">
              <textarea
                rows={2}
                className="shadow-md"
                style={styles.chatInput}
                type="text"
                placeholder="How can I help?"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              ></textarea>
              <button
                className="absolute top-0 right-1 p-1 rounded-full cursor-pointer hover:text-green-500"
                style={styles.promptButton}
                onClick={() => setShowPrompts(!showPrompts)}
              >
                <FontAwesomeIcon icon={faWandMagicSparkles} />
              </button>
              {showPrompts && (
                <div className="absolute bottom-12 right-0 w-full bg-white border-2 border-[#FB6F92] rounded-xl shadow-md z-10 overflow-hidden">
                  <div className="p-2 cursor-pointer text-[#FB6F92] bg-white shadow-md" onClick={() => setShowPrompts(false)}>
                    <FontAwesomeIcon icon={faMagicWandSparkles} className="mr-2 hover:text-red-500" />
                  </div>
                  <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {prompts.map((prompt, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer text-[#FB6F92] hover:bg-gray-100"
                        onClick={() => handlePromptClick(prompt)}
                      >
                        {prompt}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button style={styles.sendButton} className="shadow-md mb-2">
              <FontAwesomeIcon icon={faPaperPlane} className="size-6 mt-1" /> 
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  chatContent: {
    overflowY: "auto",
    height: "100%",
    // width: "100%",
    // backgroundColor: "#fff",
    backgroundImage: `url(${meshBackgroundRed})`,
    backgroundClip: "padding-box",
    backgroundSize: "cover", // Ensures the background image covers the entire container
    backgroundPosition: "center", // Centers the background image
    // backgroundAttachment: "fixed", // Fixes the background image in place
  },
  chatContentWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  chatWindow: {
    // backgroundColor: "#fff",
    color: "#000",
    // padding: "20px",
    textAlign: "center",
    // marginTop: "20px",
    // marginBottom: "20px",
  },
  chatWindowTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#FB6F92",
  },
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(224,224,224,0.5)",
    // backgroundColor: "rgba(251, 111, 146,0.5)",
    borderRadius: "16px 16px 0 0",
    paddingBottom: "150px",
    paddingTop: "12px",
  },
  chatMessenger: {
    zIndex: 2,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    padding: "10px",
    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(251, 111, 146, 1) 100%)",
  },
  chatInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "16px",
    border: "3px solid #FB6F92",
    marginRight: "5px",
    backgroundColor: "#f7f7f7",
    color: "#000",
    maxHeight: "200px",
    minHeight: "60px",
    outline: "none",
  },
  sendButton: {
    padding: "5px 10px",
    backgroundColor: "#FB6F92",
    color: "#fff",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    outline: "none",
  },
  promptButton: {
    backgroundColor: "transparent",
    color: "#FB6F92",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    outline: "none",
    // height: "50px",
    // width: "50px",
  },
  viewProfileButton: {
    backgroundColor: "#fff",
    color: "#FB6F92",
    border: "2px solid #FB6F92",
    borderRadius: "16px",
    padding: "5px 10px",
    marginBottom: "20px",
    cursor: "pointer",
    outline: "none",
  },
  agentAvatarContainer: {
    zIndex: 1,
  },
  agentAvatarImg: {
    borderRadius: "50%",
    width: "150px",
    height: "150px",
    backgroundColor: "#f7f7f7",
    border: "5px solid #FB6F92",
  },
  agentAvatarImgThumb: {
    borderRadius: "8px",
    width: "40px",
    height: "40px",
    marginRight: "5px",
    objectFit: "cover",
  },
  agentBubble: {
    backgroundColor: "#FB6F92",
    color: "#fff",
    padding: "10px",
    borderRadius: "0 20px 20px 20px",
    marginBottom: "10px",
    maxWidth: "70%",
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "start",
  },
  userBubble: {
    // backgroundColor: "#e0e0e0",
    backgroundColor: "#fff",
    color: "#000",
    padding: "10px",
    borderRadius: "20px 0 20px 20px",
    marginBottom: "10px",
    maxWidth: "70%",
    alignSelf: "flex-end",
  },
};

export default ChatWindow;
