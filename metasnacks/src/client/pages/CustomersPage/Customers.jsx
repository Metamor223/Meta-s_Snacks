import React, {useContext, useEffect} from 'react';
import "./Customers.css"
import {Context} from "../../../index";
import {fetchUsers} from "../../http/userAPI";
import {observer} from "mobx-react-lite";

const Customers = observer(() => {

    const {user} = useContext(Context)

    useEffect(() => {
        fetchUsers().then(data=>{user.setUsers(data.users)
        console.log("Users after fetch:", user.Users)}).catch(error => {
            console.error("Ошибка при загрузке пользователей:", error);
        });
    }, []);

    return (
        <div className="CustomCon">
            <table>
                <tr>
                    <th>Имя заказчика</th>
                    <th>Почта</th>
                    <th>Наименование</th>
                    <th>Откуда пришел</th>
                </tr>
                {Array.isArray(user.Users) && user.Users.map(user => (
                    <tr key={user.id}>
                        <td>{user.contactName}</td>
                        <td>{user.email}</td>
                        <td>{user.organisation_name}</td>
                        <td>instagram</td>
                    </tr>
                     ))}
            </table>
        </div>
    );
});

export default Customers;