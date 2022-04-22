import React, {ReactNode, useState} from 'react';
import {Button, Modal} from 'antd';
import {EditOutlined} from "@ant-design/icons";

export const UserModal = ({children, isAdd}:{children: ReactNode, isAdd?: boolean}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      return   setIsModalVisible(true);
    };

    const handleCancel = () => {
      return   setIsModalVisible(false);
    };

    return (
        <>
            {isAdd? <Button onClick={showModal} block>+Add</Button> :<EditOutlined onClick={showModal}/>}
            <Modal title="User" visible={isModalVisible} footer={false} onCancel={handleCancel} >
                {children}
            </Modal>
        </>
    );
}