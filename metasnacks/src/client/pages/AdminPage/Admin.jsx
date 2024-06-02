import "./Admin.css";
import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import ModalCategories from "../../components/modals/ModalCategories";
import ModalProducts from "../../components/modals/ModalProducts";
import axios from "axios";

const AdminPage = observer(() => {
    const[modalProductsActive, setModalProductsActive] = useState(false)
    const[modalCategoriesActive, setModalCategoriesActive] = useState(false)

    const downloadFile = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/file/download', { responseType: 'blob' });
            console.log('Response data:', response.data);
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            console.log('Download URL:', downloadUrl);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'products.docx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    return (
        <div className="actionList">
            <li onClick={() => setModalProductsActive(true)}>Edit products</li>
            <li onClick={() => setModalCategoriesActive(true)}>Edit categories</li>

            <ModalProducts active={modalProductsActive} setActive = {()=> setModalProductsActive(false)}/>
            <ModalCategories active={modalCategoriesActive} setActive = {() => setModalCategoriesActive(false)}/>

            <li onClick={downloadFile}>downloadFile</li>
        </div>
    );
});

export default AdminPage