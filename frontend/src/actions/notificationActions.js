import { getNotifications, createNotification } from "../api/apis";

export const fetchNotifications = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_NOTIFICATIONS_REQUEST" });
        const res = await getNotifications();
        console.log(res.data)
        dispatch({ type: "GET_NOTIFICATIONS", payload: res.data });
    } catch (error) {
        dispatch({ type: "GET_NOTIFICATIONS_FAILURE", payload: error });
    }
}


export const createNotificationAction = (payload)=>{
    return async (dispatch)=>{
        try {
            dispatch({ type: "CREATE_NOTIFICATION_REQUEST" });
            const res = await createNotification(payload);
            dispatch({ type: "CREATE_NOTIFICATION_SUCCESS", payload: res.data?.notification });
        } catch (error) {
            dispatch({ type: "CREATE_NOTIFICATION_FAILURE", payload: error });
        }
    }
}
