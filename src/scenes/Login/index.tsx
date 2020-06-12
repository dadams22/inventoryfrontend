import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../../services/user';

function Login() {
  const dispatch = useDispatch();

  return (
    <Row align='middle' justify='center' style={{ minHeight: '100vh' }}>
      <Col span={6}>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={(values) => {
            // TODO: fix onFinish and typing
            console.log(values);
            // @ts-ignore
            dispatch(login(values));
          }}
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please enter your username.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please enter your password.' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
