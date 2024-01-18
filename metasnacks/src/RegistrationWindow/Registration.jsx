import "./Registration.css";
import React from 'react';
import { Link } from "react-router-dom";

export default function Registration(){
    return(
     <div class="containerRegistration" >
        <h1>Registration</h1>
        <form action="" class="form">
            <label className="field__item">
                <input type="text" required="required"/>
                <span>Second Name</span>
            </label>
            <label className="field__item">
                <input type="text" required="required"/>
                <span>Name of organization</span>
            </label>
            <label className="field__item">
                <input type="text" required="required"/>
                <span>ITN</span>
            </label>
            <label className="field__item">
                <input type="text" required="required"/>
                <span>Email</span>
            </label>
            <label className="field__item">
                <input type="text" required="required"/>
                <span>Password</span>
            </label>
            <Link className="button__item" type="submit" to="/login">Registration</Link>
            <Link className="button__item" type="button" to="/logIn">Back</Link>
        </form>
     </div>    
    )
}