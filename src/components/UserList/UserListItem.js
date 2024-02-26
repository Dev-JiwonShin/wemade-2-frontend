// src/components/UserList/UserListItem.js
import React, {useState} from 'react';
import {Card, Button, Modal, Form, Input} from 'antd';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../utils/api';
import {deleteUserAction, updateUserAction} from '../../redux/actions/userActions';

function UserListItem({user, style}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const showModal = () => {
        form.setFieldsValue({
            name: user.name,
            email: user.email,
        });
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await updateUser(user.id, values);
            dispatch(updateUserAction(user.id, values));
            setIsModalVisible(false);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = () => {
        // 사용자 삭제 확인 모달 표시
        Modal.confirm({
            title: '사용자 삭제',
            content: `${user.name} 사용자를 정말 삭제하시겠습니까?`,
            onOk() {
                dispatch(deleteUserAction(user.id));
            },
        });
    };
    return (
        <div style={style}>
            <Card style={{margin: '5px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <div>
                        <div>{user.id}</div>
                        <div>{user.name}</div>
                        <div>{user.email}</div>
                    </div>
                    <Button onClick={showModal} style={{marginLeft: 'auto'}}>수정</Button>
                    <Button onClick={handleDelete} danger>삭제</Button>
                </div>
            </Card>
            <Modal title="사용자 정보 수정" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical" name="userForm">
                    <Form.Item name="name" label="이름" rules={[{required: true, message: '이름을 입력해주세요.'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="email" label="이메일" rules={[{required: true, message: '이메일을 입력해주세요.'}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default UserListItem;
