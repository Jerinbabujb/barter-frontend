import React from 'react';

const ChatPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your message send logic here
    console.log("Message sent");
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Profile Section */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200 bg-gray-50">
        <img src="/assets/profile_marco.png" alt="Marco's profile picture" className="w-12 h-12 rounded-full object-cover" />
        <h2 className="text-xl font-semibold text-gray-800">Marco</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {/* Display messages here */}
        <p className="text-gray-500 text-center mt-10">No messages yet</p>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="flex items-center p-4 border-t border-gray-200 bg-white">
        <input
          type="text"
          placeholder="Type your message"
          className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
