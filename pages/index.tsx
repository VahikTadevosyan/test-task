import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css'
import { Input, Popconfirm, Table, Typography} from "antd";
import React from "react";
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons";
import {UserModal} from "../components/UserModal";
import {UserForm} from "../components/UserForm";
import axios from "axios";
import useUser from "../hooks/use-user";
import Link from 'next/link'
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

type Address = {
    city?: string;
    geo?: any;
    street?: string;
    suite?: string;
    zipcode?: string;
}

export type User = {
    id: string;
    name: string;
    email: number;
    address: Address;
    phone: string;
}

export type DataIndex = 'name' | 'email' | 'address' | 'phone' | undefined

export async function getServerSideProps() {
    const data = await axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
        return res.data.map((item: User) => {
            const addressItem = item.address.city?.concat(item.address.street ? item.address.street : '').concat(item.address.suite ? item.address.suite : '')
            return {...item, address: addressItem}
        })
    })

    return {
        props: {
            data
        },
    }
}

const Home = ({data}: { data: User[] }) => {
    const {users, value, setValue, handleSearch, handleKeydown, handleReset, handleEdit, handleDelete, handleAdd} = useUser(data)
    const {Title} = Typography


    const FilterByNameInput = (title: string, dataIndex: DataIndex) => (
        <div style={{display: "flex", alignItems: 'center', justifyContent: "space-between", paddingRight: '16px'}}>
            <Title level={5}>{title}:</Title>
            <Popconfirm
                title={
                    <Input
                        placeholder={`Search ${title}`}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => handleKeydown(e, dataIndex)}
                    />}
                icon={false}
                onConfirm={() => handleSearch(dataIndex)}
                okText="Search"
                onCancel={handleReset}
                cancelText='reset'
            >
                <SearchOutlined/>
            </Popconfirm>
        </div>

    );

    const columns = [
        {
            title: FilterByNameInput('Name', 'name'),
            dataIndex: 'name',
            render: (key: any, item: User) => (
                <div style={{minWidth: 250}}>
                    <Link href={`/${item.id}`}>{item.name}</Link>
                </div>
            )
        },
        {
            title: FilterByNameInput('Email', 'email'),
            dataIndex: 'email',
            width: 250,
            responsive: ['md'] as Breakpoint[],
        },
        {
            title: FilterByNameInput('Phone', 'phone'),
            dataIndex: 'phone',
            width: 250,
            responsive: ['lg'] as Breakpoint[],
        },
        {
            title: FilterByNameInput('Address', 'address'),
            dataIndex: 'address',
            responsive: ['xl'] as Breakpoint[],
        },
        {
            title: (
                <UserModal isAdd>
                    <UserForm  add={handleAdd}/>
                </UserModal>
            ),
            dataIndex: 'edit',
            width: 80,
            render: (key: string, item: User) => {
                return (
                    <div key={item.id} style={{display: 'flex', justifyContent: "space-between"}}>
                        <UserModal>
                            <UserForm user={item} update={handleEdit}/>
                        </UserModal>
                        <Popconfirm
                            title='Delete User'
                            onConfirm={() => handleDelete(item.id)}
                            okText="Delete"
                            cancelText='Cancel'
                        >
                            <DeleteOutlined/>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ];

    return (
        <div className={styles.container}>
            <Head>
                <title>User Crud</title>
                <meta name="User Crud" content="User list"/>
            </Head>
            <Table columns={columns} dataSource={users} rowKey={(record) => record.id} pagination={false}/>
        </div>
    )
}

export default Home;
