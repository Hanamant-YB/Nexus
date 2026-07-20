import{useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import api from"../api/axios";
import useAuthStore from"../store/authStore";

const RegisterPage =()=>{
    const navigate = useNavigate();
    const{login} = useAuthStore();

    const [form, setForm] = useState({
        name:"",
        email:"",
        password:""
    });
    const[error, setError] = useState("");
    const[loading, setLoading] = useState(false); 

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);

        try{
            //Register the user
            await api.post("/api/auth/register",form);
            //imediatly log them in 
            const loginRes = await api.post("/api/auth/login",{
                email:form.email,
                password:form.password
            });
            //save token+user in authStore
            const{token,user} = loginRes.data;
            login(token,user);

            //go to dashboard
            navigate("/dashboard");
        }catch(err){
            setError(err.response?.data?.message || "Registration failed");
        }finally{
            setLoading(false);
        }
    };

    return(
            );
};