// src/redux/reducers/userReducer.js

import {
    DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS,
    FETCH_MORE_USERS_FAILURE,
    FETCH_MORE_USERS_REQUEST,
    FETCH_MORE_USERS_SUCCESS, RESET_USERS, UPDATE_USER_SUCCESS
} from "../actions/userActions";

const initialState = {
    users: [],
    loading: false,
    error: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {

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
            // 필요한 경우 에러 처리 등 추가
            return state;

        // 사용자 정보 수정 처리
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case FETCH_MORE_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_MORE_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, ...action.payload] // 기존 사용자 목록에 새로운 사용자 데이터 추가
            };
        case FETCH_MORE_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}