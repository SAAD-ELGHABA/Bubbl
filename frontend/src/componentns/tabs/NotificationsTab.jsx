import React from 'react'

const notifications = [
    { id: 1, text: "Sarah liked your post", time: "10 min ago", read: false },
    { id: 2, text: "Mike commented on your photo", time: "45 min ago", read: false },
    { id: 3, text: "You have a new friend request", time: "1 hour ago", read: true },
    { id: 4, text: "Event reminder: Team meeting tomorrow", time: "2 hours ago", read: true }
];


const NotificationsTab = () => {
    return (
        <div>
            <h2 className="text-xl font-bold text-[#02182E] mb-4">Notifications</h2>

            <div className="space-y-3">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`p-3 rounded-lg border border-gray-200 ${!notification.read ? 'bg-[#85C4E4] bg-opacity-20' : ''}`}
                    >
                        <p className="text-[#02182E]">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NotificationsTab