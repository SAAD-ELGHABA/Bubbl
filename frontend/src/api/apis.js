import axios from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers:{
        "Content-Type" : "application/json"
    }
})


export const authRegister = async (payload) =>{
    const response = await api.post('/user/register',payload)
    return response
}
export const authLogin = async (payload) =>{
    const response = await api.post('/user/login',payload)
    return response
}

export const getUserDecoded = async (token) => {
  try {
    if(!token) return;
    localStorage.setItem("token", token);
    const response = await api.get(`/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userId = response?.data?.user?.id;
    if (!userId) throw new Error("User ID not found");

    const fullUser = await getUserConnected(userId);

    return fullUser.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const getUserConnected = async (id) => {
  const response = await api.get(`/user/user/${id}`);
  return response;
};


export const resendEmail = async ()=>{
    const response = await api.post(`/user/resend-email/${localStorage?.getItem('user_slug')}`)
    return response;
} 

export const setProfileData = async (profileData)=>{
  const response = await api.post(`/user/set-profile`,profileData,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  return response;
}

export const setUserData = async (userData)=>{
  const response = await api.post(`/user/update-user`,userData,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  return response;
}

export const setPassword = async (passwordData)=>{
  const response = await api.post(`/user/update-password`,passwordData,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  return response;
}

export const getUsers = async ()=>{
  const token = localStorage.getItem('token')
  const response = await api.get(`/browse/users`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return response;
}


export const sendFriendRequest = async (userId)=>{
    const token = localStorage.getItem('token')
  const response = await api.post(`/friendship/request/${userId}`,{},{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  console.log(response)
  return response;
}

export const getNotifications = async ()=>{
  const token = localStorage.getItem('token')
  const response = await api.get(`/notifications`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return response;
}

export const createNotification = async (payload)=>{
  const token = localStorage.getItem('token')
  const response = await api.post(`/notifications`,payload,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return response;
}