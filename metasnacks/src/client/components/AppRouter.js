import React, {Component, useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {Context} from "../../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Routes>
            <Route path="*" element={
                <>
                    <div className="container">
                        <Routes>

                            {authRoutes.map(({path, Component}) =>
                             <Route key={path} path={path} element={<Component/>} exact/>
                            )}

                            {publicRoutes.map(({path, Component}) =>
                              <Route key={path} path={path} element={<Component/>} exact/>
                            )}

                        </Routes>
                    </div>
                    </>
                }
             />
        </Routes>
    );
};

export default AppRouter;