
import express from 'express';
const router = express.Router();
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification, createNotification } from '../controllers/notificationController.js';


router.post('/',createNotification)

router.get('/',getNotifications)     

router.get('/:id/read',markNotificationAsRead);
router.get('/read-all',markAllNotificationsAsRead);

router.delete('/:id',deleteNotification);

export default router;