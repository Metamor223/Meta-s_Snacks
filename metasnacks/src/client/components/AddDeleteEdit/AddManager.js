import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import {registration} from "../../http/userAPI";

const AddManager = ({setActive}) => {
    const {user} = useContext(Context)

    const [email, setEmail] = useState('')
    const [organisationName, setOrganisationName] = useState('')
    const [contactName, setContactName] = useState('')
    const [password, setPassword] = useState('')

    const signUp = async () => {
        let data
        data = await registration(email,organisationName,contactName,password)
        user.setUser(data)
    }

    return (
        <div>
            <form className="form">
                <label className="field__item">
                    <input type="text"
                           required name="email"
                           value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <span>email</span>
                </label>
                <label className="field__item">
                    <input type="text"
                           required name="organisation_name"
                           value={organisationName}
                           onChange={e => setOrganisationName(e.target.value)}/>
                    <span>Name of organization</span>
                </label>
                <label className="field__item">
                    <input type="text"
                           required name="contactName"
                           value={contactName}
                           onChange={e => setContactName(e.target.value)}/>
                    <span>Contact name</span>
                </label>
                <label className="field__item">
                    <input type="password"
                           required name="password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <span>Password</span>
                </label>
                <li className="button__item" type="submit" onClick={signUp}>Зарегистрировать</li>
            </form>
        </div>
    )
};

export default AddManager;