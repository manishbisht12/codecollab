import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import {
  MessageSquare,
  Smile,
  Send,
  Paperclip,
  EllipsisVertical,
  Mic,
  Copy,
  Play
} from "lucide-react";
import { useSocket } from "../../context/SocketContext";

function ChatPanel() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const socket = useSocket();
  const { roomId } = useParams();
  const location = useLocation();
  const username = location.state?.username || "Guest";
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Listen for user list updates
    socket.on("room-users", (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off("receive-message");
      socket.off("room-users");
    };
  }, [socket]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!message.trim() || !socket) return;

    socket.emit("send-message", {
      roomId,
      message,
      username
    });

    setMessage("");
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#0b0f1a] to-[#020617] text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-indigo-400"/>
          <span className="font-semibold text-xs">Team Chat</span>
          <span className="bg-indigo-600/30 text-indigo-300 text-xs px-2 py-[2px] rounded-full">
            {users.length}
          </span>
        </div>
        <EllipsisVertical size={18} className="text-slate-400 cursor-pointer"/>
      </div>


      {/* ACTIVE USERS */}
      <div className="flex gap-4 px-4 py-3 border-b border-slate-800 overflow-x-auto no-scrollbar">
        {users.map((user) => (
          <div key={user.socketId} className="flex flex-col items-center text-[10px] text-slate-300 min-w-fit">
            <div className="relative">
              <Avatar name={user.username} size="36" round={true} className="border-2 border-indigo-500/50" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#020617] rounded-full"/>
            </div>
            <span className="mt-1 truncate w-full text-center">{user.username === username ? "You" : user.username}</span>
          </div>
        ))}
      </div>


      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, index) => {
          const isMe = msg.socketId === socket?.id || msg.username === username;
          
          return (
            <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-2 items-start max-w-[85%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                {!isMe && (
                  <Avatar name={msg.username} size="28" round={true} />
                )}
                
                <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  {!isMe && (
                    <div className="text-[10px] text-slate-500 mb-1 ml-1">
                      {msg.username} <span className="ml-1 opacity-50">{msg.timestamp}</span>
                    </div>
                  )}
                  <div className={`text-xs px-3 py-2 rounded-2xl ${
                    isMe 
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-none" 
                      : "bg-[#1e2230] text-slate-200 rounded-tl-none"
                  }`}>
                    {msg.message}
                  </div>
                  {isMe && (
                     <div className="text-[10px] text-slate-500 mt-1 mr-1">
                        {msg.timestamp}
                     </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>


      {/* MESSAGE INPUT */}
      <div className="px-3 pb-3 border-t border-slate-800">
        <form onSubmit={handleSendMessage} className="flex items-center bg-[#141827] rounded-2xl px-3 py-2 mt-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message team..."
            className="flex-1 bg-transparent outline-none text-xs text-slate-300 placeholder:text-slate-500"
          />
          <Smile size={18} className="text-slate-400 mr-2 cursor-pointer hover:text-indigo-400 transition"/>
          <button type="submit" className="bg-indigo-600 p-2 rounded-xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20">
            <Send size={16}/>
          </button>
        </form>

        {/* FOOTER ACTIONS */}
        <div className="flex gap-4 text-[10px] text-slate-500 mt-3 px-1">
          <div className="flex items-center gap-1 cursor-pointer hover:text-slate-300 transition">
            <Mic size={12}/>
            Voice
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-slate-300 transition">
            <Copy size={12}/>
            Snippet
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-slate-300 transition">
            <Play size={12}/>
            Run
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPanel;