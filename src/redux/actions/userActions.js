// src/redux/actions/userActions.js
import {
    fetchUsers,
    fetchMoreUsers,
    createUser,
    updateUser,
    deleteUser,
    API_BASE_URL,
    fetchUserById
} from '../../utils/api';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const addUserAction = (user) => async (dispatch) => {
    dispatch({ type: ADD_USER_REQUEST });
    try {
        const response = await createUser(user);
        dispatch({ type: ADD_USER_SUCCESS, payload: response.user });
        // 새로 추가된 사용자의 정보를 가져옴
        dispatch(fetchUserByIdAction(response.user.id));
    } catch (error) {
        dispatch({ type: ADD_USER_FAILURE, payload: error.message });
    }
};


export const fetchUserByIdAction = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });
    try {
        const user = await fetchUserById(userId); // API 호출
        dispatch({
            type: FETCH_USER_SUCCESS,
            payload: user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        dispatch({
            type: FETCH_USER_FAILURE,
            payload: error.message
        });
    }
};

export const RESET_USERS = 'RESET_USERS';

export const resetUsersAction = () => {
    return { type: RESET_USERS };
};

// 사용자 삭제 액션 타입
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

// 사용자 삭제 액션 생성자
export const deleteUserAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
        await deleteUser(id); // deleteUser API 호출
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: id,
        });
        // // 삭제 성공 후 사용자 목록 새로고침
        // dispatch(fetchUsersAction());
    } catch (error) {
        console.error('Error deleting user:', error);
        dispatch({
            type: DELETE_USER_FAILURE,
            payload: error.message,
        });
    }
};


// 사용자 정보 수정 액션 타입
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

// 사용자 정보 수정 액션 생성자
export const updateUserAction = (id, userData) => async (dispatch) => {
    try {
        const updatedUser = await updateUser(id, userData); // API 호출
        console.log('updateUserAction', updatedUser);
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: { id, ...updatedUser.user },
        });
    } catch (error) {
        console.error('Error updating user:', error);
        // 에러 처리 액션 디스패치가 필요한 경우 여기에 추가
    }
};


export const FETCH_MORE_USERS_REQUEST = 'FETCH_MORE_USERS_REQUEST';
export const FETCH_MORE_USERS_SUCCESS = 'FETCH_MORE_USERS_SUCCESS';
export const FETCH_MORE_USERS_FAILURE = 'FETCH_MORE_USERS_FAILURE';
export const fetchMoreUsersAction = (currentUsersCount, sortOrder = 'asc') => async (dispatch) => {
    dispatch({ type: FETCH_MORE_USERS_REQUEST });
    try {
        const users = await fetchMoreUsers(currentUsersCount, sortOrder);
        dispatch({ type: FETCH_MORE_USERS_SUCCESS, payload: users });
    } catch (error) {
        dispatch({ type: FETCH_MORE_USERS_FAILURE, payload: error.message });
    }
};


export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsersAction = () => async (dispatch) => {
    dispatch({type: FETCH_USERS_REQUEST});
    try {
        const users = await fetchUsers();
        console.log('fetchUsersAction', users);
        /**
         [
         {
         "id": "user1",
         "name": "User 1",
         "email": "user1@example.com"
         },
         {
         "id": "user2",
         "name": "User 2",
         "email": "user2@example.com"
         },
         ...
         ]
         */
        dispatch({type: FETCH_USERS_SUCCESS, payload: users});
    } catch (error) {
        dispatch({type: FETCH_USERS_FAILURE, payload: error.message});
    }
};

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';
//
// export const addUserAction = (user) => async (dispatch) => {
//     dispatch({type: ADD_USER_REQUEST});
//     try {
//         const response = await createUser(user); // `createUser`는 `api.js`에서 정의된 함수입니다.
//         dispatch({type: ADD_USER_SUCCESS, payload: response.user});
//         // dispatch(fetchUsersAction()); // 사용자 추가 후 전체 사용자 목록을 다시 불러옵니다.
//     } catch (error) {
//         dispatch({type: ADD_USER_FAILURE, payload: error.message});
//     }
// };
//


