import React, { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Main = () => {
    let navigate = useNavigate();
    const [read, setRead] = useState([]);

    const telReg = (telnum) => {
        var number = telnum.replace(/[^0-9]/g, "");
        var phone = "";

        if (number.length < 9) {
            return number;
        } else if (number.length < 10) {
            phone += number.substr(0, 2);
            phone += "-";
            phone += number.substr(2, 3);
            phone += "-";
            phone += number.substr(5);
        } else if (number.length < 11) {
            phone += number.substr(0, 3);
            phone += "-";
            phone += number.substr(3, 3);
            phone += "-";
            phone += number.substr(6);
        } else {
            phone += number.substr(0, 3);
            phone += "-";
            phone += number.substr(3, 4);
            phone += "-";
            phone += number.substr(7);
        }

        return phone;
    }

    const loginCheck = async() => {
        const status = await axios.get('/login/status', "",{ withCredentials: true });
        console.log(status.data)
        if(!status.data) {
            navigate("/");
            console.log("로그아웃상태")
        } else{
            console.log("로그인상태")
        }
    }

    const fetchDatas = async() => {
        const response = await axios.get('http://localhost:4000/shelter/getData', { withCredentials: true });
        await setRead(response.data.rows);
    }

    useEffect(() => {
        loginCheck();
        fetchDatas();
    },[]);
 
    return (
        <>
            <br/>
            <h1>구호소</h1>
            <table className="tablelist">
                <thead>
                    <tr>
                        <th>구호소코드</th>
                        <th>구호소명</th>
                        <th>구호소구분</th>
                        <th>주소</th>
                        <th>최대수용인원</th>
                        <th>구호소연락처</th>
                    </tr>
                </thead>
                <tbody>
                    {read.map((v, i) => (
                        <tr>
                            <td key={v.shelter_id}>{v.shelter_id}</td>
                            <td key={v.shelter_name+v.shelter_id+v.shelter_name}><Link to={`/shelter/${v.shelter_id}`}>{v.shelter_name}</Link></td>
                            <td key={v.shelter_category+v.shelter_id+v.shelter_category}>{v.shelter_category}</td>
                            <td key={v.shelter_address+v.shelter_id+v.shelter_address}>{v.shelter_address}</td>
                            <td key={v.shelter_quantity+v.shelter_id+v.shelter_quantity}>{(v.shelter_quantity).toLocaleString('ko-KR')}</td>
                            <td key={v.shelter_tel+v.shelter_id+v.shelter_tel}>{telReg(v.shelter_tel)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <br/>
            <Link to="/shelter/input"><button>구호소 등록</button></Link>
        </>
    )


}

export default Main;