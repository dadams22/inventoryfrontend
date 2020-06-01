import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

function Login() {

    // TODO: - I have these result types as Object because I don't want to do 'any', but this feels wrong
    const onFinish = (values: Object) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: Object) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row align={'middle'} justify={'center'} style={{ minHeight: '100vh' }}>
            <Col span={6}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email.' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password.' }]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;