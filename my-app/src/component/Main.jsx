import { React, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Main = () => {
    let navigate = useNavigate();

    const loginCheck = async() => {
        const response = await axios.get('/login/status', "",{ withCredentials: true });
        console.log(response.data)
        if(!response.data) {
            navigate("/");
            console.log("로그아웃상태")
        } else{
            console.log("로그인상태")
        }
    }

    useEffect(() => {
        loginCheck();
    },[]);

    return (
        <>
            <br/>
            <h1>환영합니다</h1>
            <Link to="/shelter"><button>구호소</button></Link><br/>
            <Link to="/supplies/main"><button>보급품</button></Link><br/>
            <Link to="/victim"><button>이재민</button></Link><br/>
        </>
    )


}

export default Main;