import "./Admin.css";
import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import ModalCategories from "../../components/modals/ModalCategories";
import ModalProducts from "../../components/modals/ModalProducts";
import axios from "axios";
import ModalUsers from "../../components/modals/ModalUsers";
import {Context} from "../../../index";
import {jwtDecode} from "jwt-decode";

const AdminPage = observer(() => {
    const[modalProductsActive, setModalProductsActive] = useState(false)
    const[modalCategoriesActive, setModalCategoriesActive] = useState(false)
    const[modalRegistrationActive, setModalRegistrationActive] = useState(false)

    const {user} = useContext(Context)

    const downloadFile = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/file/download', {
                responseType: 'blob'
            });
            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', 'заказчики.docx');
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(blobUrl);
            link.remove();

        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    useEffect(() => {
        console.log("User in context:", user);
        console.log("User role:", user?.User?.role);
    }, [user]);

    return (
        <div className="actionList">
            <li onClick={() => setModalProductsActive(true)}>Редактирование продуктов</li>

            <li onClick={() => setModalCategoriesActive(true)}>Редактирование категории</li>
            {user && user.User && user.User.role === 'ADMIN' && (
                <li onClick={() => setModalRegistrationActive(true)}>Редактирование пользователей</li>
            )}
            <ModalProducts active={modalProductsActive} setActive = {()=> setModalProductsActive(false)}/>
            <ModalCategories active={modalCategoriesActive} setActive = {() => setModalCategoriesActive(false)}/>
            <ModalUsers active={modalRegistrationActive} setActive = {()=> setModalRegistrationActive(false)}/>

            <li onClick={downloadFile}>Скачать файл с пользователями</li>
        </div>
    );
});

export default AdminPage