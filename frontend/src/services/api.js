import  axios  from 'axios';

const authAPI = axios.create({
    baseURL: 'https://chatapp-bceh.onrender.com/api/auth',
    withCredentials: true
})

const userAPI = axios.create({
    baseURL: 'https://chatapp-bceh.onrender.com/api/users/profile',
    withCredentials: true
})

const messagesAPI = axios.create({
    baseURL: 'https://chatapp-bceh.onrender.com/api/messages',
    withCredentials: true
})

const chatsAPI = axios.create({
    baseURL: 'https://chatapp-bceh.onrender.com/api/chats',
    withCredentials: true
})

//authAPIs
export const loginUser = (data) => authAPI.post('/login', data);
export const signupUser = (data) => authAPI.post('/signup', data);
export const logout = () => authAPI.post('/logout');

//userAPIs
export const getUserProfile = () => userAPI.get('/me');
export const editUserProfile = (newname) => userAPI.patch('/edit', { newname });
export const deleteUserProfile = () => userAPI.delete('/delete');
export const changePassword = (data) => userAPI.patch('/changePassword', data);
export const getUsersByIds = async(ids) => {
    return await userAPI.post('/bulk', { ids });
}

//messagesAPIs
export const getMessages = async(chatId) => {
    return await messagesAPI.post('/getAll', { chatId });
}
export const sendMessage = async(data) => {
    return await messagesAPI.post('/send', data);
}

//chatsAPIs
export const getChatsList = async() => {
    return await chatsAPI.get('/chatsList');
}