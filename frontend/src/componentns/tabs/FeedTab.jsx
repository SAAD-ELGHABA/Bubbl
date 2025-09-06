import React from 'react'



const feedPosts = [
    { id: 1, user: "Mike Thompson", text: "Just finished an amazing project using the MERN stack!", time: "2 hours ago", likes: 24, comments: 5 },
    { id: 2, user: "Sarah Johnson", text: "Beautiful day for hiking! 🏞️", time: "5 hours ago", likes: 42, comments: 8 }
];


const FeedTab = () => {
    return (
        <div>
            {/* Feed posts */}
            <div className="space-y-4">
                {feedPosts.map(post => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <p className="font-semibold text-[#02182E]">{post.user}</p>
                                <p className="text-xs text-gray-500">{post.time}</p>
                            </div>
                        </div>
                        <p className="mb-3">{post.text}</p>
                        <div className="flex text-sm text-[#488DB4]">
                            <button className="flex items-center mr-4">
                                <span className="mr-1">👍</span> {post.likes}
                            </button>
                            <button className="flex items-center">
                                <span className="mr-1">💬</span> {post.comments} comments
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeedTab