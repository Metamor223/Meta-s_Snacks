import "./Admin.css";
import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import ModalCategories from "../../components/modals/ModalCategories";
import ModalProducts from "../../components/modals/ModalProducts";
import ModalRecipes from "../../components/modals/ModalRecipes";

const AdminPage = observer(() => {
    const[modalProductsActive, setModalProductsActive] = useState(false)
    const[modalCategoriesActive, setModalCategoriesActive] = useState(false)
    const[modalRecipesActive, setModalRecipesActive] = useState(false)

    return (
        <div className="actionList">
            <li onClick={() => setModalProductsActive(true)}>Edit products</li>
            <li onClick={() => setModalCategoriesActive(true)}>Edit categories</li>
            <li onClick={() => setModalRecipesActive(true)}>Edit recipes</li>

            <ModalProducts active={modalProductsActive} setActive = {()=> setModalProductsActive(false)}/>
            <ModalCategories active={modalCategoriesActive} setActive = {() => setModalCategoriesActive(false)}/>
            <ModalRecipes active={modalRecipesActive} setActive = {() => setModalRecipesActive(false)}/>
        </div>

    );
});

export default AdminPage