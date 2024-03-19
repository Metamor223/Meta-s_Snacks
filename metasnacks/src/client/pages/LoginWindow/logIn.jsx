import React, {useContext, useState} from 'react';
import { Link} from 'react-router-dom';
import "./logIn.css";
import {CATALOG_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {login} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const LogIn = observer(() =>{

    const {user} = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {
        try {
            let data
            data = await login(email, password)
            user.setUser(data)
            user.setIsAuth(true)
        }
        catch (e)
        {
            alert(e.response.data.message)
        }
    }

    return (
        <div className="containerLogIn">
            <h1>Welcome in Meta`Snaks</h1>
            <form action="" className="form">
                <label className="field__item">

                    <input
                        type="text"
                        required="required"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <span>email</span>
                </label>
                <label className="field__item">
                    <input
                        type="password"
                        required="required"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    <span>Password</span>

                </label>
                <Link className="button__item" type="button" to={CATALOG_ROUTE} onClick={signIn}>LogIn</Link>
                <div className="register_item">
                    <p>Don`t have account ?</p>
                    <Link className="button__item" to={REGISTRATION_ROUTE}>Registration</Link>
                </div>
            </form>
        </div>
    )  
})

export default LogIn