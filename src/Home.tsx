import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Login from './Login';

function Home() {
    const [ isLoginVisible, setIsLoginVisible ] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsLoginVisible(true)}>
                Login
            </Button>

            <Modal
                title="Login"
                visible={isLoginVisible}
                onCancel={() => setIsLoginVisible(false)}
                footer={null}
            >
                <Login/>
            </Modal>
        </div>
    );
}

export default Home;