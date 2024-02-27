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
    ORDERS_ROUTE
} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import AdminPage from "../AdminPage/Admin";

const Navbar = observer(() => {
    const {user} = useContext(Context)
return (
    <header>
    <Link to={CATALOG_ROUTE} className="site-title">Meta`snaks</Link>
        <nav>
            <ul>
                <li>
                <CustomLink to={CATALOG_ROUTE}>Catalog</CustomLink>
                    {user.isAuth ? (
                        <>
                <CustomLink to={CONTACT_ROUTE}>Contacts</CustomLink>
                <CustomLink to={ACCOUNT_ROUTE}>Account</CustomLink>
                            <>
                <li>  <Link to={LOGIN_ROUTE} onClick={()=> user.setIsAuth(false)}>Log Out</Link></li>
                <CustomLink to={ORDERS_ROUTE}>Orders</CustomLink>
                <CustomLink to={CART_ROUTE}>Cart</CustomLink>
                            </>
                        </>
                       ) : (
                <>
                    <CustomLink to={CONTACT_ROUTE}>Contacts</CustomLink>
                   <li> <Link to={LOGIN_ROUTE}>Log In</Link> </li>
                </>
                )}
                    {user.role === 'ADMIN' && (
                        <CustomLink to={ADMIN_ROUTE}>Admin</CustomLink>
                    )}
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