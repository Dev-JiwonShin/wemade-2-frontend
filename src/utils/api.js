// src/utils/api.js
export const API_BASE_URL = 'http://localhost:2000/users';

export const fetchMoreUsers = async (currentUsersCount, sortOrder = 'asc') => {
    const limit = 10;
    const offset = Number(currentUsersCount); // 숫자 타입으로 변환
    console.log('offset', offset);
    const response = await fetch(`${API_BASE_URL}?limit=${limit}&offset=${offset}&sortOrder=${sortOrder}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const addUser = async (user) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Error adding user');
    }
    return await response.json();
};

export const updateUser = async (id, user) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Error updating user');
    }
    return await response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error deleting user');
    }
    return await response.json();
};

