import React from 'react'


const messages = [
    { id: 1, name: "Sarah Johnson", text: "Hey, how are you doing?", time: "10:30 AM", unread: 2 },
    { id: 2, name: "Mike Thompson", text: "About tomorrow's meeting...", time: "9:15 AM", unread: 0 },
    { id: 3, name: "Lisa Anderson", text: "Did you see the new project specs?", time: "Yesterday", unread: 1 }
];


const MessagesTab = () => {
    return (
        <div>
            <h2 className="text-xl font-bold text-[#02182E] mb-4">Messages</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 border-r border-gray-200 pr-4">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#85C4E4]"
                    />

                    <div className="space-y-2">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`p-3 rounded-lg cursor-pointer ${message.unread > 0 ? 'bg-[#85C4E4] bg-opacity-20' : 'hover:bg-gray-100'}`}
                            >
                                <div className="flex items-center">
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="User"
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <p className="font-semibold text-[#02182E]">{message.name}</p>
                                            <p className="text-xs text-gray-500">{message.time}</p>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">{message.text}</p>
                                    </div>
                                    {message.unread > 0 && (
                                        <span className="bg-[#488DB4] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                                            {message.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="flex items-center p-3 border-b border-gray-200">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="User"
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <p className="font-semibold text-[#02182E]">Sarah Johnson</p>
                            <p className="text-xs text-gray-500">Online</p>
                        </div>
                    </div>

                    <div className="h-64 overflow-y-auto p-4 space-y-4">
                        <div className="flex justify-start">
                            <div className="bg-[#85C4E4] bg-opacity-30 rounded-lg p-3 max-w-xs">
                                <p>Hey, how are you doing?</p>
                                <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="bg-[#022F56] bg-opacity-10 rounded-lg p-3 max-w-xs">
                                <p>I'm good! Just working on a new project.</p>
                                <p className="text-xs text-gray-500 mt-1">10:32 AM</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex p-3 border-t border-gray-200">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#85C4E4]"
                        />
                        <button className="ml-2 bg-[#022F56] text-white px-4 py-2 rounded-lg hover:bg-[#02182E]">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagesTab