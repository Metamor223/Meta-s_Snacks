import "./header.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar(){
return (
    <header>
    <Link to="/main" className="site-title">Meta`snaks</Link>
        <nav>
            <ul>            
                <li>
                <CustomLink to="/">Catalog</CustomLink>
                <CustomLink to="/contacts">Contacts</CustomLink>
                <CustomLink to="/account">Account</CustomLink>
                </li>
                <li>
                <CustomLink to="/orders">Orders</CustomLink>
                <Link to="/login">Log Out</Link>
                <CustomLink to="/cart">Cart</CustomLink>
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