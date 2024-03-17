import React, {useState} from 'react';

const EditCategories = ({setActive}) => {
    const [value, setValue] = useState('')



    return (
        <div>

            <div className="ModalsButton">
                <li onClick={setActive}>Close window</li>
                <li onClick={SaveCategory}>Save changes</li>
            </div>
        </div>
    );
};

export default EditCategories;