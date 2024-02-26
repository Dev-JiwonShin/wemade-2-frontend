// src/App.js
import React, {useState} from 'react';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import {Button, Modal} from 'antd';
import {useDispatch} from 'react-redux';
import {addUserAction, fetchMoreUsersAction, resetUsersAction} from './redux/actions/userActions';

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' 또는 'desc' 상태 추가
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSubmit = (user) => {
        dispatch(addUserAction(user)).then(() => {
            // 사용자 추가 성공 후 로직
            if (sortOrder === 'desc') {
                // 내림차순 상태에서는 사용자 목록을 새로고침하여 최신 상태를 반영
                dispatch(resetUsersAction()); // 목록 초기화
                dispatch(fetchMoreUsersAction(0, sortOrder)); // 현재 정렬 상태에 맞게 사용자 목록 다시 불러오기
            }
        });
        setIsModalVisible(false);
    };


    return (
        <div className="App">
            <Button type="primary" onClick={showModal}>
                사용자 추가
            </Button>
            <Modal
                title="사용자 추가"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <UserForm onSubmit={onSubmit}/>
            </Modal>
            <UserList sortOrder={sortOrder} setSortOrder={setSortOrder}/>
        </div>
    );
}

export default App;
