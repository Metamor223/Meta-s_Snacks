import React, {useContext, useEffect} from 'react';
import "./Customers.css";
import {Context} from "../../../index";
import {fetchUsers} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import ModalCustomers from "../../components/modals/ModalCustomers";

const Customers = observer(() => {

    const {user} = useContext(Context)

    const refetchData = () => {
        fetchUsers().then(data=>{user.setUsers(data.users)
            console.log("Users after fetch:", user.Users)}).catch(error => {
            console.error("Ошибка при загрузке пользователей:", error);
        });
    }

    useEffect(() => {
       refetchData()
    }, []);

    return (
        <div className="OrdersContainer">
            <h3>Форма для заказчика</h3>
            <ModalCustomers refetchData={refetchData}/>
            <h3>Список заказчиков</h3>
            <table>
                <tr>
                    <th>Имя заказчика</th>
                    <th>Номер телефона</th>
                    <th>Наименование</th>
                    <th>Откуда пришел</th>
                </tr>
                {Array.isArray(user.Users) && user.Users.map(user => (
                    <tr key={user.id}>
                        <td>{user.contactName}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.organisation_name}</td>
                        <td>{user.comeFrom}</td>
                    </tr>
                     ))}
            </table>
        </div>
    );
});

export default Customers;