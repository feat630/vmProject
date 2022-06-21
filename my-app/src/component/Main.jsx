import React from "react"; 
import { Link } from "react-router-dom";

export const Main = () => {

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