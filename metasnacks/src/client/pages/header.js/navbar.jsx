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
    <Link to={CATALOG_ROUTE} className="site-title">Customs`naks</Link>
        <nav>
            <ul>
                <li>
                <CustomLink to={CATALOG_ROUTE}>Catalog</CustomLink>
                    {user.isAuth ?
                        <>
                    <div className="loggedIn">
                <CustomLink to={ORDERS_ROUTE}>Orders</CustomLink>
                <CustomLink to={FEEDBACK_ROUTE}>Feedback</CustomLink>
                <CustomLink to={CUSTOMERS_ROUTE}>Customers</CustomLink>
                <CustomLink to={ADMIN_ROUTE}>Admin</CustomLink>
                <CustomLink to={WAREHOUSE_ROUTE}>Warehouse</CustomLink>
                <Link to={LOGIN_ROUTE} onClick={()=> user.setIsAuth(false)}>Log Out</Link>
                    </div>
                        </>
                        :
                <>
                <Link to={LOGIN_ROUTE}>Log In</Link>
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