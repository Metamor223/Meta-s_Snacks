import "./header.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar(){
return (
    <header>
    <Link to="/main" className="site-title">Meta`snaks</Link>
        <nav>
            <ul>            
                <li>
                <CustomLink to="/main/catalog">Catalog</CustomLink>
                <CustomLink to="/main/contacts">Contacts</CustomLink>
                <CustomLink to="/main/account">Account</CustomLink>
                </li>
                <li>
                <CustomLink to="/main/ordersFactory">Orders</CustomLink>
                <Link to="/login">Log Out</Link>
                <CustomLink to="/main/cart">Cart</CustomLink>
                </li>
            </ul>

        </nav>
    </header>
 )
}

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