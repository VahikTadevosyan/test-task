import axios from "axios";
import {User} from "./index";
import {Card} from "antd";
import 'antd/dist/antd.css';

type Query = {
    id: string;
}

export async function getServerSideProps({query}:{query: Query}) {
    const data = await axios.get(`https://jsonplaceholder.typicode.com/users/${query.id}`).then((res)=>{
        const addressItem = res.data.address.city?.concat(res.data.address.street ? res.data.address.street : '').concat(res.data.address.suite ? res.data.address.suite : '')
        return {...res.data, address: addressItem}
    })
    return {
        props: {
            data
        },
    }
}

const UserPage = ({data}:{data: User}) => {
    return (
        <>
            <Card title={`Full Name: ${data.name}`} style={{ width: 350, margin: "auto" }}>
                <p>{`Address: ${data.address}`}</p>
                <p>{`Phone Number: ${data.phone}`}</p>
            </Card>
        </>
    )
}

export default UserPage;