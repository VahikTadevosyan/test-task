import { Form, Input, Button, Checkbox } from 'antd';
import {User} from "../../pages";

export const UserForm = ({user}:{user: User}) => {
    const onFinish = (values: User) => {
        console.log('Success:', values);
    };
    console.log(user, "test")
    return (
        <Form
            // name="user"
            onFinish={onFinish}
            autoComplete="off"
            layout={"vertical"}
            initialValues={user}
        >
            <Form.Item
                label="Name"
                name="name"
            >
                <Input  />
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
                label="Phone"
                name="phone"
            >
                <Input  />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};