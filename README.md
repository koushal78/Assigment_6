💬 Modern Chat Application
A fully-functional, real-time messaging interface built with Next.js, TypeScript, and Tailwind CSS.
Show Image
Features
Core Functionality

✅ Real-time messaging with message bubbles and timestamps
✅ User status management (Online, Busy, BRB, Offline)
✅ Message reactions - Add/remove emoji reactions to messages
✅ Typing indicators - Shows when other users are typing
✅ Emoji picker - Insert emojis into your messages

UI Components

🎨 Modern gradient UI with beautiful animations
📱 Fully responsive design - Works on desktop, tablet and mobile
🌙 Dark theme optimized for comfort
📈 Elegant transitions using Framer Motion

User Experience

🔍 Searchable conversations
🔔 Unread message counters
👤 User profiles with status indicators
📱 Mobile-friendly sidebar that collapses on smaller screens

Technical Implementation
This application is created as a single .tsx file that includes:

React functional components with TypeScript interfaces
Custom hooks for state management
Framer Motion animations for smooth transitions
Tailwind CSS for styling without external UI libraries
Mock data structure for users and messages

How to Use
Installation

Create a new Next.js project:

bashnpx create-next-app@latest my-chat-app

Install dependencies:

bashnpm install framer-motion emoji-picker-react lucide-react

Copy ChatApp.tsx to your project
Import and use the component in your page

Running the App
bashnpm run dev
Design Choices
UI/UX Philosophy

Dark theme with purple/indigo accents for visual comfort
Message bubbles with color-coding for sender identification
Gradient elements to create visual hierarchy
Subtle animations that enhance the experience without overwhelming the user

Animation Strategy

Micro-animations provide feedback for user actions
Scale transforms on hover for interactive elements
Smooth transitions for modals and dropdowns
Subtle bounce animations for typing indicators

Implementation Details
State Management

User online status and current user selection
Message input and sending functionality
Emoji picker toggle state
Sidebar visibility for responsive design

Component Structure

ChatApp: Main container component
Navbar: Top navigation with user controls
Sidebar: User list with search capability
ChatWindow: Message display area
MessageInput: Text input with emoji picker

Future Enhancements
While the current implementation meets all requirements, future iterations could include:

Group chat functionality
File sharing capabilities
Voice/video call integration
Message search functionality
End-to-end encryption indicators
Message threading for organized conversations


Created with ❤️ for the Frontend Developer Assignment
