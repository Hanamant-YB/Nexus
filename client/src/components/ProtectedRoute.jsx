import{Navigate} from "react-router-dom";
import userAuthStore from "../store/authStore";
import { Children } from "react";

const ProtectedRoute = ({Children})=>{
    const {token} = userAuthStore();
    //if not token = not loged in = redirect to login
    if(!token){
        return <Navigate to="/login" replace/>
    }
    //token exists = render the actual page
    return Children;
};

export default ProtectedRoute;