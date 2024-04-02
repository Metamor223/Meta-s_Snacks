import "./header.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import {Context} from "../../../index";
import {useContext} from "react";
import {
    ACCOUNT_ROUTE,
    ADMIN_ROUTE,
    CART_ROUTE,
    CATALOG_ROUTE,
    CONTACT_ROUTE,
    LOGIN_ROUTE,
    ORDERS_ROUTE,
    WAREHOUSE_ROUTE
} from "../../utils/consts";
import {observer} from "mobx-react-lite";

const Navbar = observer(() => {
    const {user} = useContext(Context)
return (
    <header>
    <Link to={CATALOG_ROUTE} className="site-title">Metas`naks</Link>
        <nav>
            <ul>
                <li>
                <CustomLink to={CATALOG_ROUTE}>Catalog</CustomLink>
                    {user.isAuth ?
                        <>
                <CustomLink to={CONTACT_ROUTE}>Contacts</CustomLink>
                <CustomLink to={ACCOUNT_ROUTE}>Account</CustomLink>
                    <div className="loggedIn">
                <CustomLink to={ORDERS_ROUTE}>Orders</CustomLink>
                <CustomLink to={CART_ROUTE}>Cart</CustomLink>
                <CustomLink to={ADMIN_ROUTE}>Admin</CustomLink>
                <CustomLink to={WAREHOUSE_ROUTE}>Warehouse</CustomLink>
                <Link to={LOGIN_ROUTE} onClick={()=> user.setIsAuth(false)}>Log Out</Link>
                    </div>
                        </>
                        :
                <>
                    <CustomLink to={CONTACT_ROUTE}>Contacts</CustomLink>
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