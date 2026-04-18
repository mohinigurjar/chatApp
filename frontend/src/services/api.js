import  axios  from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/users',
    withCredentials: 'true'
})

export const loginUser = (data) => API.post('/login', data);
export const signupUser = (data) => API.post('/signup', data);
export const getUser = (userId) => {
    return API.get(`/profile/${userId}`);
}
export const getUserById = async(ids) => {
    return await API.get('/profile/bulk');
}