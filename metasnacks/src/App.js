import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Navbar from './client/pages/header.js/navbar';
import AppRouter from "./client/components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./client/http/userAPI";


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            check().then(data => {
                user.setUser(true)
                user.setIsAuth(true)
            }).finally(() => setLoading(false))
        });
    }, [])

    if(loading)
    {
        return (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        )
    }

  return (
      <BrowserRouter>
          <Navbar/>
          <AppRouter/>
      </BrowserRouter>
  )
})
export default App;