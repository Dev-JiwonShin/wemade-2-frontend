// src/components/UserForm/UserForm.js
import React from 'react';
import { Form, Input, Button } from 'antd';

function UserForm({ onSubmit, initialValues }) {
    return (
        <Form
            initialValues={initialValues}
            onFinish={onSubmit}
            layout="vertical"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the user\'s name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input the user\'s email!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default UserForm;
