import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import {UserForm} from "../UserForm";
import {EditOutlined} from "@ant-design/icons";
import {User} from "../../pages";

export const UserModal = ({user}:{user: User}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      return   setIsModalVisible(true);
    };

    const handleOk = () => {
      return   setIsModalVisible(false);
    };

    const handleCancel = () => {
      return   setIsModalVisible(false);
    };

    return (
        <>
            <EditOutlined onClick={showModal}/>
            <Modal title="Basic Modal" visible={isModalVisible} footer={false} onCancel={handleCancel} >
                <UserForm/>
            </Modal>
        </>
    );
};