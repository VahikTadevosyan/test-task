import { Form, Input, Button } from 'antd';
import {User} from "../../pages";

export const UserForm = ({user, update}:{user: User, update: (data:User, val: Partial<User>)=>void}) => {
    const onFinish = (values: User) => {
        update(user, values)
    };

    return (
        <Form
            name="user"
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