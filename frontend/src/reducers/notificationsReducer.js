export const initialNotificationsState = {
  items: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

export const notificationsReducer = (state = initialNotificationsState, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS": {
      let count = 0;
      
      action.payload.forEach(ele => {
        ele.read == false ? count += 1 : '';
      });
      console.log(count)
     return { ...state, unreadCount:count, items: action.payload}
    } 
    case "NOTIFICATIONS_ADD": {
      const newItems = Array.isArray(action.payload) ? action.payload : [action.payload];
      return {
        ...state,
        items: [...newItems, ...state.items].slice(0, 100),
        unreadCount: state.unreadCount + newItems.length,
      };
    }
    case "NOTIFICATIONS_MARK_ALL_READ": {
      return { ...state, unreadCount: 0 };
    }
    case "CREATE_NOTIFICATION_REQUEST": {
      return { ...state, loading: true, error: null };
    }
    case "CREATE_NOTIFICATION_SUCCESS": {
      return { ...state, loading: false, items: [...state.items, action.payload] };
    }
    case "CREATE_NOTIFICATION_FAILURE": {
      return { ...state, loading: false, error: action.payload, items: [...state.items, action.payload] };
    }
    default:
      return state;
  }
}; 