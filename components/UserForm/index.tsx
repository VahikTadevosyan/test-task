import { Form, Input, Button, Checkbox } from 'antd';

export const UserForm = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="user-form"

            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout={"vertical"}
        >
            <Form.Item
                label="Name"
                name="name"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Age"
                name="age"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Address"
                name="address"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Number"
                name="number"
            >
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};