// src/App.js
import React, {useState} from 'react';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import {Button, Modal} from 'antd';
import {useDispatch} from 'react-redux';
import {addUserAction} from './redux/actions/userActions';

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSubmit = (user) => {
        dispatch(addUserAction(user));
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
            <UserList/>
        </div>
    );
}

export default App;
