'use client';

import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import { Bell, Sun, Moon, Smile, Send, Menu, X, ChevronDown, Settings, LogOut, Search } from "lucide-react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";

const initialMessages = [
  { id: 1, sender: "Alice", text: "Hey! How are you doing today?", timestamp: "10:00 AM", reaction: "👍" },
  { id: 2, sender: "Bob", text: "Hello there! I'm working on that project we discussed.", timestamp: "10:01 AM", reaction: "" },
  { id: 3, sender: "Alice", text: "That's great! Can you share some updates?", timestamp: "10:05 AM", reaction: "❤️" },
];

// Theme Context
const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {}
});

const useTheme = () => useContext(ThemeContext);

interface NavbarProps {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ status, setStatus, toggleSidebar, isSidebarOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isDark, toggleTheme } = useTheme();
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
    <nav className={`flex items-center justify-between px-4 sm:px-8 py-3 shadow-md w-full z-10 ${
      isDark ? 'bg-gray-900' : 'bg-white border-b border-gray-200'
    }`}>
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className={`mr-4 transition-colors duration-200 md:hidden ${
            isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          💬 MY-Chat
        </div>
      </div>
      <div className="relative flex items-center gap-4 sm:gap-6">
        <button className={`transition-colors duration-200 ${
          isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'
        }`}>
          <Bell size={20} />
        </button>
        <button 
          onClick={toggleTheme}
          className={`transition-colors duration-200 ${
            isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
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
            <div className={`w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer font-semibold ${
              isDark ? 'text-gray-100' : 'text-white'
            }`}>
              A
            </div>
            <ChevronDown size={16} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
          </div>
          {showDropdown && (
            <div className={`absolute right-0 top-12 border rounded-md shadow-lg z-20 w-48 overflow-hidden ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`p-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Set Status</p>
              </div>
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatus(s);
                    setShowDropdown(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-colors duration-200 ${
                    isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
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
              <div className={`border-t mt-1 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-colors duration-200 ${
                    isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings size={16} />
                  Settings
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-colors duration-200 ${
                    isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
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
  const { isDark } = useTheme();

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
      className={`w-full md:w-80 flex-shrink-0 border-r h-screen overflow-hidden absolute md:relative z-10 ${
        isDark ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-200 bg-gray-50 text-gray-700'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-3">
          <div className="relative">
            <Search size={18} className={`absolute left-3 top-2.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
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
                  ? (isDark ? "bg-gray-700" : "bg-gray-200")
                  : (isDark ? "hover:bg-gray-700" : "hover:bg-gray-100")
              }`}
            >
              <div className="relative">
                <div className={`w-10 h-10 rounded-full ${
                  user.status === "Online" ? "bg-indigo-600" :
                  user.status === "Busy" ? "bg-yellow-600" :
                  user.status === "BRB" ? "bg-orange-600" :
                  "bg-gray-600"
                } flex items-center justify-center text-white font-medium`}>
                  {user.avatar}
                </div>
                <div
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 ${
                    isDark ? 'border-gray-800' : 'border-gray-50'
                  } ${
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
                  <span className={`font-medium truncate ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{user.name}</span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.time}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className={`text-sm truncate pr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{user.lastMessage}</p>
                  {user.unread > 0 && (
                    <span className="flex-shrink-0 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
  const { isDark } = useTheme();
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
    <div className={`border-t p-3 relative z-10 ${
      isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
    }`}>
      <div className="relative flex items-center gap-2" ref={emojiRef}>
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className={`transition-colors duration-200 flex-shrink-0 ${
            isDark ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'
          }`}
          title="Emoji Picker"
          type="button"
        >
          <Smile size={22} />
        </button>
        {showEmoji && (
          <div className="absolute bottom-12 left-0 z-50">
            <EmojiPicker theme={isDark ? Theme.DARK : Theme.LIGHT} onEmojiClick={handleEmojiClick} width={320} height={400} />
          </div>
        )}
        <div className="flex-1 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className={`flex-1 p-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
          <button
            onClick={handleSendClick}
            disabled={input.trim() === ""}
            type="button"
            className={`p-2 rounded-full ml-2 flex-shrink-0 ${
              input.trim() === "" 
                ? (isDark ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-gray-300 text-gray-500 cursor-not-allowed")
                : "bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatWindow = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { isDark } = useTheme();
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
    <div className={`flex-1 h-full flex flex-col overflow-hidden ${
      isDark ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'
    }`}>
      <div className={`border-b p-3 flex items-center ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
              A
            </div>
            <div
              className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 bg-green-500 ${
                isDark ? 'border-gray-800' : 'border-gray-50'
              }`}
              title="Online"
            ></div>
          </div>
          <div className="ml-3">
            <div className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Alice</div>
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
              <span className={`text-sm mb-1 ml-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{msg.sender}</span>
              <div 
                className={`p-3 rounded-lg shadow-sm ${
                  msg.sender === "You" 
                    ? "bg-indigo-600 text-white" 
                    : (isDark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-900")
                }`}
              >
                <div className="flex items-center">
                  <span className="break-words">{msg.text}</span>
                  {msg.reaction && (
                    <span className="ml-2 text-lg">{msg.reaction}</span>
                  )}
                </div>
              </div>
              <div className={`text-xs mt-1 flex items-center justify-between px-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
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
          <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="flex space-x-1">
              <div className={`rounded-full h-2 w-2 animate-bounce ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: "0ms" }} />
              <div className={`rounded-full h-2 w-2 animate-bounce ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: "200ms" }} />
              <div className={`rounded-full h-2 w-2 animate-bounce ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: "400ms" }} />
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

const Footer = () => {
  const { isDark } = useTheme();
  
  return (
    <footer className={`text-center py-2 text-sm border-t ${
      isDark 
        ? 'bg-gray-800 text-gray-400 border-gray-700' 
        : 'bg-gray-50 text-gray-600 border-gray-200'
    }`}>
      Made with ❤️ by <span className="font-semibold text-indigo-600">Koushal Kumar</span>
    </footer>
  );
};

const ChatApp = () => {
  const [status, setStatus] = useState("Online");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`h-screen flex flex-col overflow-hidden ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        <Navbar status={status} setStatus={setStatus} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="flex flex-1 relative overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} />
          <ChatWindow />
        </div>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default ChatApp;