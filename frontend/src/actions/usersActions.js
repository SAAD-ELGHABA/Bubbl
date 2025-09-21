import { getUsers } from "../api/apis";

export const fetchUsers = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_USERS_REQUEST" });
        const res = await getUsers();
        dispatch({ type: "GET_USERS_SUCCESS", payload: res.data?.users });
    } catch (error) {
        dispatch({ type: "GET_USERS_FAILURE", payload: error });
    }
}


export const fetchUserBySlug = (slug) => async (dispatch) => {
        dispatch({ type: "GET_USER_BY_SLUG_REQUEST" });
      
        setTimeout(() => {
            dispatch({ type: "GET_USER_BY_SLUG_SUCCESS", payload: slug });
        }, 1000);
}