import { React, useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";


export const TopMenu = () => {
    const [isLogin, setIsLogn] = useState();

    const fetchDatas = async() => {
        const response = await axios.get('http://localhost:4000/login/status', { withCredentials: true });
        setIsLogn(response.data.id);
    }

    const logout = async() => {
        const response = await axios.get('http://localhost:4000/login/logout', { withCredentials: true });
        setIsLogn(...isLogin, response.data.id);
    }

    useEffect(() => {
        fetchDatas();
    },[isLogin]);


    if(isLogin) {
        return (
            <>
                <Link to="/main">Home</Link>&nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/" onClick={logout}>logout</Link><br/>&nbsp; &nbsp; &nbsp; &nbsp;
                <span>{isLogin}님 환영합니다</span>
            </>
        )
    } else {
        return (
            <>
            <Link to="/main">Home</Link>&nbsp; &nbsp; &nbsp; &nbsp;
            <Link to="/">login</Link>&nbsp; &nbsp; &nbsp; &nbsp;
            <span>{isLogin}</span>
            </>
        )
    }
    


}

export default TopMenu;