import React from 'react';
import { Link } from 'react-router-dom';
import "./logIn.css";

export default function LogIn () {
    return (
        <div className="containerLogIn">
            <h1>Welcome in Meta`Snaks</h1>
            <form action="" className="form">
                <label className="field__item">
                    <input type="text" required="required"/>
                    <span>Second Name</span>
                </label>
                <label className="field__item">
                    <input type="text" required="required"/>
                    <span>Password</span>
                </label>
                <Link className="button__item" type="button" to="/main">LogIn</Link>
                <div className="register_item">
                    <p>Don`t have account ?</p>
                    <Link className="button__item" to="/registration">Registration</Link>
                </div>
            </form>
        </div>
    )  
}
