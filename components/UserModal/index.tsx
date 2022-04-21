import React, {ReactNode, useState} from 'react';
import { Modal } from 'antd';
import {EditOutlined} from "@ant-design/icons";

export const UserModal = ({children}:{children: ReactNode}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      return   setIsModalVisible(true);
    };

    const handleCancel = () => {
      return   setIsModalVisible(false);
    };

    return (
        <>
            <EditOutlined onClick={showModal}/>
            <Modal title="Basic Modal" visible={isModalVisible} footer={false} onCancel={handleCancel} >
                {children}
            </Modal>
        </>
    );
};