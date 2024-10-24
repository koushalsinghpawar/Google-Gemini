import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, previousPrompt, setRecentPrompt,newChat } = useContext(Context);
  
  // Ensure previousPrompt is an array
  const prompts = Array.isArray(previousPrompt) ? previousPrompt : [];

  // const loadPrompts = async(prompt) =>{
  //   setRecentPrompt(prompt)
  //   await onSent(prompt)
  // }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          src={assets.menu_icon}
          alt="Menu Icon"
          className="menu"
          onClick={() => setExtended(!extended)}
        />
        <div onClick={() => newChat() } className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prompts.map((item, index) => (
              <div className="recent-entry" key={index}>
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0,20)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Question Icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History Icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;


