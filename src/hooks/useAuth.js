import { useSelector } from "react-redux";
//for private route , we need to check in redux store if there is an access token

export default function useAuth() {
    const auth = useSelector((state) => state.auth);

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false;
    }
}
