import React, {useContext, useState, useRef} from 'react';
import {Context} from "../../../index";
import {createCustomer} from "../../http/userAPI";
import {IMask, IMaskInput} from "react-imask";

const ModalCustomers = ({refetchData}) => {

    const {user} = useContext(Context)

    const inputRef = useRef(null)
    const ref = useRef(null)

    const [contactName, setContactName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [organisation_name, setOrganisation_name] = useState('')
    const [comeFrom, setComeFrom] = useState('')

    const addCustomer = () => {
        const formData = new FormData()
        formData.append('contactName', contactName)
        formData.append('organisation_name', organisation_name)
        formData.append('comeFrom', comeFrom)
        formData.append('phoneNumber', `${phoneNumber}`)
        const formDataObject = {};
        for (const [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }
        console.log(formDataObject);
        createCustomer(formData).then()
        refetchData();
    }

    return (
        <div className="ModalOrder">
            <form>
                <input
                    placeholder="Введите имя контакта"
                    value={contactName}
                    onChange={e=> setContactName(e.target.value)}
                />
                <input
                    placeholder="Введите название организации"
                    value={organisation_name}
                    onChange={e=> setOrganisation_name(e.target.value)}
                />
                    <input
                        placeholder="Откуда узнал заказчик о компании"
                        value={comeFrom}
                        onChange={e=> setComeFrom(e.target.value)}
                    />
                <IMaskInput
                    mask='+0 (000) 000-00-00'
                    unmask={true}
                    ref={ref}
                    inputRef={inputRef}
                    onAccept={(value, mask) => setPhoneNumber(value)}
                    placeholder='Введите номер телефона'
                />
                <li onClick={addCustomer}>Добавить заказчика</li>
            </form>
        </div>
    );
};


export default ModalCustomers;