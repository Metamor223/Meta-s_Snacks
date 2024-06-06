import "./header.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import {Context} from "../../../index";
import {useContext} from "react";
import {
    ADMIN_ROUTE,
    CATALOG_ROUTE, CUSTOMERS_ROUTE, FEEDBACK_ROUTE,
    LOGIN_ROUTE,
    ORDERS_ROUTE,
    WAREHOUSE_ROUTE
} from "../../utils/consts";
import {observer} from "mobx-react-lite";

const Navbar = observer(() => {
    const {user} = useContext(Context)
return (
    <header>
    <Link to={CATALOG_ROUTE} className="site-title">Кастомные снеки</Link>
        <nav>
            <ul>
                <li>
                <CustomLink to={CATALOG_ROUTE}>Каталог</CustomLink>
                    {user.isAuth ?
                        <>
                    <div className="loggedIn">
                <CustomLink to={ORDERS_ROUTE}>Заказы</CustomLink>
                <CustomLink to={FEEDBACK_ROUTE}>Общение с клиентами</CustomLink>
                <CustomLink to={CUSTOMERS_ROUTE}>Заказчики</CustomLink>
                <CustomLink to={ADMIN_ROUTE}>Админ панель</CustomLink>
                <CustomLink to={WAREHOUSE_ROUTE}>Склад</CustomLink>
                <Link to={LOGIN_ROUTE} onClick={()=> user.setIsAuth(false)}>Выход</Link>
                    </div>
                        </>
                        :
                <>
                <Link to={LOGIN_ROUTE}>Вход</Link>
                </>
                }
              </li>
            </ul>

        </nav>
    </header>
 );
});

export default Navbar;

function CustomLink({to, children, ...props}){
const resolvedpath = useResolvedPath(to)
const isActive = useMatch({path: resolvedpath.pathname, end: true})

    return(
    <li
    className={isActive === to ? "active" : ""}>
    <Link to={to} {...props}>
    {children}
    </Link>     
    </li>
    );
}