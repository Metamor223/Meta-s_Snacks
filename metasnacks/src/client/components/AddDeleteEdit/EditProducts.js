import React, {useState} from 'react';

const EditProducts = ({setActive}) => {

    const [name,setName] = useState('')
    const [file,setFile] = useState(null)
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)

    return (
        <div>

            <div className="ModalsButton">
                <li onClick={setActive}>Close window</li>
                <li onClick={SaveProduct}>Save changes</li>
            </div>
        </div>
    );
};

export default EditProducts;