import axios from 'axios';

const API_URL = 'http://localhost:3030/tasks';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.response.use(
    response => response,
    error => {
        if (axios.isAxiosError(error) && !error.response) {
            window.dispatchEvent(new CustomEvent('server-down'));
        }
        return Promise.reject(error);
    }
);

export const fetchTasks = async () => {
    const res = await api.get('/');
    return res.data;
};

export const createTask = async (data: { title: string; description: string }) => {
    const res = await api.post('/', data);
    return res.data;
};

export const deleteTask = async (id: number) => {
    return await api.delete(`/${id}`);
};

export const updateStatus = async (id: number, status: 'pending' | 'done') => {
    return await api.patch(`/${id}`, { status });
};
