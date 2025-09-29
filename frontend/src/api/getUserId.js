function getUserIdFromToken() {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('No token found');
      return null;
    }
    
    const payload = token.split('.')[1];
    
    const decodedPayload = JSON.parse(atob(payload));
    
    return decodedPayload.id || decodedPayload.userId || decodedPayload.sub;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

const userId = getUserIdFromToken();
export default userId;
