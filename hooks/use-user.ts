import {DataIndex, User} from "../pages";
import React, {useState} from "react";

const useUser = (initialUsers: User[]) => {
    const [users, setUsers] = useState(initialUsers);
    const [value, setValue] = useState('');


    const handleReset = () => {
        setValue('')
        setUsers(initialUsers)
    }

    const handleSearch = (dataIndex: DataIndex) => {
        if (!value) return setUsers(initialUsers)
        const filteredData = users.filter((entry: User) => {
                if (dataIndex) {
                    const col = entry[dataIndex].toString()
                    return col.toLowerCase().includes(value.toLowerCase())
                }

            }
        );
        setUsers(filteredData);
    }

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>, dataIndex: DataIndex) => {
        if (e.key === 'Enter') {
            handleSearch(dataIndex)
        }
    }

    const handleEdit = (user: any, values:any) =>{
        const updatedUser = {...user, ...values}
        setUsers((users)=>
            users.map((item)=> item.id === user.id? {...item, ...updatedUser} : item)
        )
    }

    return {users, value,setValue, handleReset, handleSearch, handleKeydown, handleEdit}
}

export default useUser;