import React from "react";
import MessagesAside from "../MessagesAside";
import ConversationCor from "../conversation/ConversationCor";

const messages = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "Hey, how are you doing?",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Mike Thompson",
    text: "About tomorrow's meeting...",
    time: "9:15 AM",
    unread: 0,
  },
  {
    id: 3,
    name: "Lisa Anderson",
    text: "Did you see the new project specs?",
    time: "Yesterday",
    unread: 1,
  },
];

const MessagesTab = () => {
  return (
    <div className="h-screen">
      {/* <h2 className="text-xl font-bold text-[#02182E] m-4">Messages</h2> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <MessagesAside messages={messages}/>
        <ConversationCor/>
      </div>
    </div>
  );
};

export default MessagesTab;
