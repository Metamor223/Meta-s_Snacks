import React, {useContext, useEffect} from 'react';
import {Context} from "../../../index";
import {fetchManagers, fetchUsers} from "../../http/userAPI";

const ListManagers = () => {
    const {user} = useContext(Context)

    useEffect(() => {
        fetchManagers().then(data=>{user.setUsers(data.users)
            console.log("Users after fetch:", user.Users)}).catch(error => {
            console.error("Ошибка при загрузке пользователей:", error);
        });
    }, []);

    return (
            <div className="CustomCon">
                <table>
                    <tr>
                        <th>Имя</th>
                        <th>Почта</th>
                    </tr>
                    {Array.isArray(user.Users) && user.Users.map(user => (
                        <tr key={user.id}>
                            <td>{user.contactName}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </table>
            </div>
    );
};

export default ListManagers;