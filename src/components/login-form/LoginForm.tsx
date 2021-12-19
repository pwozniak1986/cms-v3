import Loader from 'components/Loader';
import styled from '@emotion/styled'
import useAuthStore from 'store/auth'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { css } from '@styled-system/css'


export default function LoginForm() {
    const isFetching = useAuthStore(state => state.isFetching)
    const obtainToken = useAuthStore(state => state.obtainToken)

    const onSubmit = (values: any) => {
        const {username, password, remember} = values
        obtainToken(username, password, remember, (error:any) => message.error("ERROR: " + JSON.stringify(error)))
    }

    return (
        <Styled.Container>
            <Loader isLoading={isFetching}>
                <Form
                    autoComplete="off"
                    initialValues={{ remember: true }}
                    labelCol={{ span: 8 }}
                    name="basic"
                    wrapperCol={{ span: 16 }}
                    onFinish={onSubmit}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit" type="primary">Submit</Button>
                    </Form.Item>
                </Form>
            </Loader>
        </Styled.Container >
    )
}

const Styled = {
    Container: styled('div')(css({
        width:'100%',
        minHeight:'360px',
        flexDirection:'column',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        "> form":{
            minWidth:'400px'
        }
    })),
}