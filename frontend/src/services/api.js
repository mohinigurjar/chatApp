import  axios  from 'axios';

const userAPI = axios.create({
    baseURL: 'http://localhost:5000/api/users',
    withCredentials: true
})

const messagesAPI = axios.create({
    baseURL: 'http://localhost:5000/api/messages',
    withCredentials: true
})

export const loginUser = (data) => userAPI.post('/login', data);
export const signupUser = (data) => userAPI.post('/signup', data);
export const getUser = (userId) => {
    return userAPI.get(`/profile/${userId}`);
}
export const getUserByIds = async(ids) => {
    return await userAPI.post('/profile/bulk', { ids });
}
export const getMessages = async(roomId) => {
    return await messagesAPI.post('/getMessages', { roomId });
}