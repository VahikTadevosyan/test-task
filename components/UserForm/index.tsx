import { Form, Input, Button } from 'antd';
import {User} from "../../pages";
import {FC} from "react";

type UserFormProps = {
    user?: User;
    update?: (data:User, val: Partial<User>)=>void;
    add?: (data: User)=>void;
}

export const UserForm: FC<UserFormProps> = ({user, update, add}) => {
    const onFinish = (values: User) => {
        if (update && user) {
            update(user, values)
        }
        if (add) {
            add(values)
        }
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
                label="Email"
                name="email"
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
                    {update ? 'Save' : 'Add'}
                </Button>
            </Form.Item>
        </Form>
    );
};