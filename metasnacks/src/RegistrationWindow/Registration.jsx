import "./Registration.css";
import React, {useState} from 'react';
import { Link } from "react-router-dom";

export default function Registration(){
    const [formData, setFormData] = useState({
        login: '',
        organizationName: '',
        itn: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // В этом месте вы можете использовать formData для отправки данных на сервер
        console.log('Form data submitted:', formData);
      };

    return(
     <div className="containerRegistration" >
        <h1>Registration</h1>
        <form onSubmit={handleSubmit} className="form">
            <label className="field__item">
                <input type="text" required name="login" value={formData.login} onChange={handleChange}/>
                <span>Login</span>
            </label>
            <label className="field__item">
                <input type="text" required name="organisation_name" value={formData.organisationName} onChange={handleChange}/>
                <span>Name of organization</span>
            </label>
            <label className="field__item">
                <input type="text" required name="itn" value={formData.itn} onChange={handleChange}/>
                <span>ITN</span>
            </label>
            <label className="field__item">
                <input type="text" required name="password" value={formData.password} onChange={handleChange}/>
                <span>Password</span>
            </label>
            <Link className="button__item" type="submit" to="/login">Registration</Link>
            <Link className="button__item" type="button" to="/logIn">Back</Link>
        </form>
     </div>    
    )
}