import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/lws-logo-dark.svg";
import { userLoggedOut } from "../../features/auth/authSlice";

export default function Navigation() {
    const dispatch = useDispatch();
    const {user } = useSelector((state) => state.auth) || {};
    const {name} = user || {};

    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    };
    return (
        <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/">
                        <img
                            className="h-10"
                            src={logoImage}
                            alt="Learn with Sumit"
                        />
                    </Link>
                    <ul className="
                    flex justify-between items-center space-x-8
                    ">
                        <li
                        className="text-white"
                        >
                            Hello, {name}
                        </li> 
                        <li className="text-white">
                            <span className="cursor-pointer " onClick={logout}>
                                Logout
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
