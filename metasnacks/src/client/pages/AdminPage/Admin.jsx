import "./Admin.css";
import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import ModalCategories from "../../components/modals/ModalCategories";
import ModalProducts from "../../components/modals/ModalProducts";
import axios from "axios";
import ModalUsers from "../../components/modals/ModalUsers";

const AdminPage = observer(() => {
    const[modalProductsActive, setModalProductsActive] = useState(false)
    const[modalCategoriesActive, setModalCategoriesActive] = useState(false)
    const[modalRegistrationActive, setModalRegistrationActive] = useState(false)

    const downloadFile = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/file/download', {
                responseType: 'blob'
            });
            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', 'products.docx');
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(blobUrl);
            link.remove();

        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    return (
        <div className="actionList">
            <li onClick={() => setModalProductsActive(true)}>Редактирование продуктов</li>
            <li onClick={() => setModalCategoriesActive(true)}>Редактирование категории</li>
            <li onClick={() => setModalRegistrationActive(true)}>Редактирование пользователей</li>

            <ModalProducts active={modalProductsActive} setActive = {()=> setModalProductsActive(false)}/>
            <ModalCategories active={modalCategoriesActive} setActive = {() => setModalCategoriesActive(false)}/>
            <ModalUsers active={modalRegistrationActive} setActive = {()=> setModalRegistrationActive(false)}/>

            <li onClick={downloadFile}>Скачать файл с пользователями</li>
        </div>
    );
});

export default AdminPage