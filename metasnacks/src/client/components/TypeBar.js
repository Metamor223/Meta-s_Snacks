import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import {fetchProducts} from "../http/productAPI";

const TypeBar = observer((removeCategory)=> {
    const {product} = useContext(Context)

    // Проверяем, является ли product.typeProduct массивом перед вызовом метода map
    if (!Array.isArray(product.typeProduct)) {
        return null; // или другое поведение по умолчанию
    }

    return(
        <>
            {product.typeProduct.map(type=>
                <li
                    className={type.id === product.selectedType.id ? "ListItem active" : "ListItem"}
                    onClick={()=> product.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name_type}
                </li>
            )}
        </>
    )
})

export default TypeBar