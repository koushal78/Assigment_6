'use client';

import React, { useEffect, useRef, useState } from "react";
import { Bell, Sun, Smile, Send, Menu, X, ChevronDown, Settings, LogOut, Search } from "lucide-react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";

const initialMessages = [
  { id: 1, sender: "Alice", text: "Hey! How are you doing today?", timestamp: "10:00 AM", reaction: "👍" },
  { id: 2, sender: "Bob", text: "Hello there! I'm working on that project we discussed.", timestamp: "10:01 AM", reaction: "" },
  { id: 3, sender: "Alice", text: "That's great! Can you share some updates?", timestamp: "10:05 AM", reaction: "❤️" },
];

interface NavbarProps {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ status, setStatus, toggleSidebar, isSidebarOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const statuses = ["Online", "Busy", "BRB", "Offline"];
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between bg-gray-900 px-4 sm:px-8 py-3 shadow-md w-full z-10">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="mr-4 text-gray-300 hover:text-gray-100 transition-colors duration-200 md:hidden"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="text-xl font-bold text-gray-100">
          💬 Chat-App
        </div>
      </div>
      <div className="relative flex items-center gap-4 sm:gap-6">
        <button className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
          <Bell size={20} />
        </button>
        <button className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
          <Sun size={20} />
        </button>
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div
              className={`h-3 w-3 rounded-full ${
                status === "Online"
                  ? "bg-green-500"
                  : status === "Busy"
                  ? "bg-yellow-400"
                  : status === "BRB"
                  ? "bg-orange-400"
                  : "bg-gray-400"
              }`}
              title={status}
            ></div>
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-gray-100 flex items-center justify-center cursor-pointer font-semibold">
              A
            </div>
            <ChevronDown size={16} className="text-gray-300" />
          </div>
          {showDropdown && (
            <div className="absolute right-0 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20 w-48 overflow-hidden">
              <div className="p-2 border-b border-gray-700">
                <p className="text-gray-300 text-sm font-medium">Set Status</p>
              </div>
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatus(s);
                    setShowDropdown(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left transition-colors duration-200"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      s === "Online"
                        ? "bg-green-500"
                        : s === "Busy"
                        ? "bg-yellow-400"
                        : s === "BRB"
                        ? "bg-orange-400"
                        : "bg-gray-400"
                    }`}
                  />
                  {s}
                </button>
              ))}
              <div className="border-t border-gray-700 mt-1">
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left transition-colors duration-200"
                >
                  <Settings size={16} />
                  Settings
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left transition-colors duration-200"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const users = [
  { id: 1, name: "Alice", status: "Online", avatar: "A", lastMessage: "How are you doing today?", time: "10:23 AM", unread: 2 },
  { id: 2, name: "Bob", status: "Busy", avatar: "B", lastMessage: "Can we talk later?", time: "9:45 AM", unread: 0 },
  { id: 3, name: "Charlie", status: "BRB", avatar: "C", lastMessage: "I'll be right back", time: "Yesterday", unread: 0 },
  { id: 4, name: "Diana", status: "Offline", avatar: "D", lastMessage: "Let's meet tomorrow", time: "Yesterday", unread: 0 },
  { id: 5, name: "Ethan", status: "Online", avatar: "E", lastMessage: "Thanks for the info!", time: "Monday", unread: 0 },
  { id: 6, name: "Fiona", status: "Online", avatar: "F", lastMessage: "Project update?", time: "Sunday", unread: 1 },
];

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [search, setSearch] = useState("");
  const [activeUser, setActiveUser] = useState(1);

  const sidebarVariants = {
    open: { 
      x: 0,
      display: "block",
      transition: { duration: 0.3 }
    },
    closed: { 
      x: "-100%",
      transition: { duration: 0.3 },
      transitionEnd: { display: "none" }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="w-full md:w-80 flex-shrink-0 border-r border-gray-700 bg-gray-800 text-gray-300 h-screen overflow-hidden absolute md:relative z-10"
    >
      <div className="flex flex-col h-full">
        <div className="p-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>
        </div>
        <div className="overflow-y-auto flex-1 px-2 pb-4 space-y-1">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setActiveUser(user.id)}
              className={`flex items-center p-2 rounded-lg transition-all cursor-pointer ${
                activeUser === user.id 
                  ? "bg-gray-700" 
                  : "hover:bg-gray-700"
              }`}
            >
              <div className="relative">
                <div className={`w-10 h-10 rounded-full ${
                  user.status === "Online" ? "bg-indigo-600" :
                  user.status === "Busy" ? "bg-yellow-600" :
                  user.status === "BRB" ? "bg-orange-600" :
                  "bg-gray-600"
                } flex items-center justify-center text-gray-100 font-medium`}>
                  {user.avatar}
                </div>
                <div
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-800 ${
                    user.status === "Online"
                      ? "bg-green-500"
                      : user.status === "Busy"
                      ? "bg-yellow-400"
                      : user.status === "BRB"
                      ? "bg-orange-400"
                      : "bg-gray-400"
                  }`}
                  title={user.status}
                ></div>
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="font-medium truncate text-gray-200">{user.name}</span>
                  <span className="text-xs text-gray-400">{user.time}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-400 truncate pr-2">{user.lastMessage}</p>
                  {user.unread > 0 && (
                    <span className="flex-shrink-0 bg-indigo-600 text-gray-100 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {user.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface MessageInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const MessageInput: React.FC<MessageInputProps> = ({ input, setInput, handleSend, inputRef }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emojiData: any) => {
    setInput((prev) => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSendClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="border-t border-gray-700 p-3 bg-gray-800 relative z-10">
      <div className="relative flex items-center gap-2" ref={emojiRef}>
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex-shrink-0"
          title="Emoji Picker"
          type="button"
        >
          <Smile size={22} />
        </button>
        {showEmoji && (
          <div className="absolute bottom-12 left-0 z-50">
            <EmojiPicker theme={Theme.DARK} onEmojiClick={handleEmojiClick} width={320} height={400} />
          </div>
        )}
        <form onSubmit={(e) => e.preventDefault()} className="flex-1 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
          <button
            onClick={handleSendClick}
            disabled={input.trim() === ""}
            type="button"
            className={`p-2 rounded-full ml-2 flex-shrink-0 ${
              input.trim() === "" 
                ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
                : "bg-indigo-600 text-gray-100 hover:bg-indigo-700 transition-all duration-200"
            }`}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

const ChatWindow = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFocus = () => setIsTyping(true);
    const handleBlur = () => setIsTyping(false);
    const inputEl = inputRef.current;
    inputEl?.addEventListener("focus", handleFocus);
    inputEl?.addEventListener("blur", handleBlur);
    return () => {
      inputEl?.removeEventListener("focus", handleFocus);
      inputEl?.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reaction: "",
    };
    setMessages([...messages, newMessage]);
    setInput("");
    // Make sure to focus back on the input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const addReaction = (id: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, reaction: emoji } : msg))
    );
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-gray-900 text-gray-200 overflow-hidden">
      <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-gray-100 font-medium">
              A
            </div>
            <div
              className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-gray-800 bg-green-500"
              title="Online"
            ></div>
          </div>
          <div className="ml-3">
            <div className="font-medium text-gray-200">Alice</div>
            <div className="text-xs text-green-400">Online</div>
          </div>
        </div>
      </div>
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex flex-col max-w-xs lg:max-w-md">
              <span className="text-sm text-gray-400 mb-1 ml-1">{msg.sender}</span>
              <div 
                className={`p-3 rounded-lg shadow-sm ${
                  msg.sender === "You" 
                    ? "bg-indigo-600 text-gray-100" 
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <span className="break-words">{msg.text}</span>
                  {msg.reaction && (
                    <span className="ml-2 text-lg">{msg.reaction}</span>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-1 flex items-center justify-between px-1">
                <span>{msg.timestamp}</span>
                {msg.sender !== "You" && (
                  <button
                    onClick={() => addReaction(msg.id, msg.reaction ? "" : "❤️")}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                    title="React with emoji"
                    type="button"
                  >
                    <Smile size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center text-gray-400 gap-2">
            <div className="flex space-x-1">
              <div className="bg-gray-500 rounded-full h-2 w-2 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="bg-gray-500 rounded-full h-2 w-2 animate-bounce" style={{ animationDelay: "200ms" }} />
              <div className="bg-gray-500 rounded-full h-2 w-2 animate-bounce" style={{ animationDelay: "400ms" }} />
            </div>
            <span className="text-sm">Alice is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        inputRef={inputRef}
      />
    </div>
  );
};

const ChatApp = () => {
  const [status, setStatus] = useState("Online");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <Navbar status={status} setStatus={setStatus} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatApp;