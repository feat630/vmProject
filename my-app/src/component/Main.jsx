import React from "react"; 
import { Link } from "react-router-dom";

export const Main = () => {

    return (
        <>
            <br/>
            <h1>환영합니다</h1>
            <Link to="/inputform"><button>test입력하러가기</button></Link><br/>
            <Link to="/patientinputform"><button>신규환자등록</button></Link><br/>
            <Link to="/patientlist"><button>환자목록보기</button></Link><br/>
        </>
    )


}

export default Main;