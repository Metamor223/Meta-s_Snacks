import "./Registration.css";
import React, {useContext, useState} from 'react';
import { Link } from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {login, registration} from "../../http/userAPI";

const Registration = observer(() =>{
    const {user} = useContext(Context)

    const [email, setEmail] = useState('')
    const [organisationName, setOrganisationName] = useState('')
    const [itn, setItn] = useState('')
    const [password, setPassword] = useState('')

    const signUp = async () => {
        let data
        data = await registration(email,organisationName,itn,password)
        user.setUser(data)
    }
    return(
     <div className="containerRegistration" >
        <h1>Registration</h1>
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
                       required name="itn"
                       value={itn}
                       onChange={e => setItn(e.target.value)}/>
                <span>ITN</span>
            </label>
            <label className="field__item">
                <input type="text"
                       required name="password"
                       value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <span>Password</span>
            </label>
            <Link className="button__item" type="submit" to={LOGIN_ROUTE} onClick={signUp}>Registration</Link>
            <Link className="button__item" type="button" to={LOGIN_ROUTE}>Back</Link>
        </form>
     </div>    
    )
})

export default Registration