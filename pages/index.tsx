import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css'
import {Input, Popconfirm, Table, Typography} from "antd";
import React, {useState} from "react";
import {SearchOutlined} from "@ant-design/icons";
import {UserModal} from "../components/UserModal";
import {UserForm} from "../components/UserForm";
import axios from "axios";

export type User = {
    id: string;
    name: string;
    age: number;
    address: string;
    phone: string;
}

type DataIndex = 'name' | 'age' | 'address' | 'phone' | undefined

const data = [
    {
        id: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        phone: '9765644544645'
    },
    {
        id: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
        phone: '5498988797945'
    },
    {
        id: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        phone: '0797464564645'
    },
    {
        id: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        phone: '7567456864645'
    },
];

export async function getServerSideProps() {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
    return {
        props: {
            userList: data
        },
    }
}

const Home: NextPage = (userList) => {

    console.log(userList, 'test')
    const [dataSource, setDataSource] = useState(data);
    const [value, setValue] = useState('');
    const {Title} = Typography

    const handleReset = (dataIndex: DataIndex) => {
        setValue('')
        handleSearch(dataIndex)
    }

    const handleSearch = (dataIndex: DataIndex) => {
        const filteredData = dataSource.filter((entry: User) => {
               if (dataIndex) {
                   const col = entry[dataIndex].toString()
                   return col.toLowerCase().includes(value.toLowerCase())
               }
            }
        );
        setDataSource(filteredData);
    }

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>, dataIndex: DataIndex) => {
        if (e.key === 'Enter') {
            handleSearch(dataIndex)
        }
    }

    const FilterByNameInput = (title: string, dataIndex: DataIndex) => (
        <>
            <div style={{display: "flex", alignItems: 'center', justifyContent: "space-between", paddingRight: '16px'}}>
                <Title level={5}>{title}:</Title>
                <Popconfirm
                    title={<Input
                        placeholder={`Search ${title}`}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e)=>handleKeydown(e,dataIndex)}
                    />}
                    icon={false}
                    onConfirm={() => handleSearch(dataIndex)}
                    okText="Search"
                    showCancel={false}
                >
                    <SearchOutlined/>
                </Popconfirm>
            </div>
        </>

    );

    const columns = [
        {
            title: FilterByNameInput('Name', 'name'),
            dataIndex: 'name',
            width: 250
        },
        {
            title: FilterByNameInput('Age', 'age'),
            dataIndex: 'age',
            width: 250
        },
        {
            title: FilterByNameInput('Address', 'address'),
            dataIndex: 'address',
            width: 250
        },
        {
            title: FilterByNameInput('Phone', 'phone'),
            dataIndex: 'phone',
            width: 250
        },
        {
            dataIndex: 'edit',
            width: 80,
            render: (key: string, item: User) => {
               return (
                   <div key={item.id} style={{display: 'flex', justifyContent: "center"}}>
                       <UserModal>
                           <UserForm user={item}/>
                       </UserModal>
                   </div>
               )
            }
        }
    ];

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Table columns={columns} dataSource={dataSource}/>
        </div>
    )
}

export default Home
