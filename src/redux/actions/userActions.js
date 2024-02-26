// src/redux/actions/userActions.js
import {
    fetchMoreUsers,
    addUser,
    updateUser,
    deleteUser,
} from '../../utils/api';

export const FETCH_MORE_USERS_REQUEST = 'FETCH_MORE_USERS_REQUEST';
export const FETCH_MORE_USERS_SUCCESS = 'FETCH_MORE_USERS_SUCCESS';
export const FETCH_MORE_USERS_FAILURE = 'FETCH_MORE_USERS_FAILURE';
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const RESET_USERS = 'RESET_USERS';

export const fetchMoreUsersAction = (currentUsersCount, sortOrder = 'asc') => async (dispatch) => {
    dispatch({type: FETCH_MORE_USERS_REQUEST});
    try {
        const users = await fetchMoreUsers(currentUsersCount, sortOrder); // API 호출
        dispatch({type: FETCH_MORE_USERS_SUCCESS, payload: users});
    } catch (error) {
        dispatch({type: FETCH_MORE_USERS_FAILURE, payload: error.message});
    }
};

export const addUserAction = (user) => async (dispatch) => {
    dispatch({type: ADD_USER_REQUEST});
    try {
        console.log('ADD_USER_REQUEST : addUserAction', user);
        const response = await addUser(user); // API 호출
        console.log('response', response);
        dispatch({type: ADD_USER_SUCCESS, payload: response.user});

    } catch (error) {
        dispatch({type: ADD_USER_FAILURE, payload: error.message});
    }
};

export const updateUserAction = (id, userData) => async (dispatch) => {
    try {
        const updatedUser = await updateUser(id, userData); // API 호출
        console.log('updateUserAction', updatedUser);
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: {id, ...updatedUser.user},
        });
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

export const deleteUserAction = (id) => async (dispatch) => {
    dispatch({type: DELETE_USER_REQUEST});
    try {
        await deleteUser(id); // deleteUser API 호출
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: id,
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        dispatch({
            type: DELETE_USER_FAILURE,
            payload: error.message,
        });
    }
};

export const resetUsersAction = () => {
    return {type: RESET_USERS};
};
