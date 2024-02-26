// src/redux/reducers/userReducer.js

import {
    FETCH_MORE_USERS_FAILURE,
    FETCH_MORE_USERS_REQUEST,
    FETCH_MORE_USERS_SUCCESS,
    UPDATE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    RESET_USERS,
} from "../actions/userActions";

const initialState = {
    users: [],
    loading: false,
    error: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MORE_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FETCH_MORE_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, ...action.payload]
            };

        case FETCH_MORE_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };

        case RESET_USERS:
            return {
                ...state,
                users: [], // 사용자 목록 초기화
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                // 삭제된 사용자를 목록에서 제거
                users: state.users.filter((user) => user.id !== action.payload),
            };

        case DELETE_USER_REQUEST:
        case DELETE_USER_FAILURE:
            return state;

        default:
            return state;
    }
}