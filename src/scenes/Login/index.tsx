import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { login } from '../../services/user';
import { ApplicationState } from '../../store';

function Login() {
  const authenticated = useSelector(
    (state: ApplicationState) => state.user.authenticated,
  );

  const dispatch = useDispatch();

  return authenticated ? (
    <Redirect to='/' />
  ) : (
    <Row align='middle' justify='center' style={{ minHeight: '100vh' }}>
      <Col span={6}>
        <Typography.Title level={2}>Login to reINVENTory</Typography.Title>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={(values) => {
            // TODO: fix onFinish and typing
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
