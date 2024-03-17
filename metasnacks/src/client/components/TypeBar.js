import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../../index";

const TypeBar = observer(()=> {
    const {product} = useContext(Context)

    const handleCategoryClick = (type) => {
        // Если текущая выбранная категория совпадает с категорией, на которую нажали,
        // то сбрасываем выбранную категорию
        if (type.id === product.selectedType.id) {
            product.setSelectedType(null);
        } else {
            // Иначе выбираем новую категорию
            product.setSelectedType(type);
        }
    };

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