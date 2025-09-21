export const initialState = {
    allUsers:[],
    user:null,
    loading:false,
    error:null
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_USERS_REQUEST":
            return {...state, loading:true}
        case "GET_USERS_SUCCESS":
            return {...state, allUsers:action.payload, loading:false}
        case "GET_USERS_FAILURE":
            return {...state, error:action.payload, loading:false}
        case "GET_USER_BY_SLUG_REQUEST":
            return {...state, loading:true}
        case "GET_USER_BY_SLUG_SUCCESS": 
        const user = state.allUsers.find(user => user.slug === action.payload)  
        return {...state,user:user, loading:false}
           
        case "GET_USER_BY_SLUG_FAILURE":
            return {...state, error:action.payload, loading:false}
        default:
            return state
    }
}