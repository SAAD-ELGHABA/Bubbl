import Notification from "../models/Notification.js";

export const createNotification = async (req, res) => {
    console.log(req.body);
    try {
        const notification = await Notification.create({
            sendTo: req.body.sendTo,
            sendFrom:req.body.sendFrom,   
            message: req.body.message,
            read: false,
            createdAt: new Date()
        });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


export const getNotifications = async (req, res) => {
    console.log(req.user.id)
    try {
        const notifications = await Notification.find({ sendTo: req.user.id })
        .sort({ createdAt: -1 })
        .limit(50);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const markNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { read: true },
            { new: true }
        );
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const markAllNotificationsAsRead = async (req, res) => {
    try {
        const notifications = await Notification.updateMany({ user: req.user.id }, { read: true });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}