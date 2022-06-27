import React, { useEffect, useState } from "react"; 
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const View = () => {
    let navigate = useNavigate();

    const [read, setRead] = useState([]);
    const {index} = useParams();

    const fetchDatas = async() => {
        const response = await axios.get(`http://localhost:4000/shelter/getOne/${index}`);
        await setRead(response.data);
    }

    const dataDelete = async(v) => {
        await axios.post('/shelter/deleteData',{
			data: {'data': [
				v.shelter_id]
			}
		});
        navigate("/shelter");
    }

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

    useEffect( () => {
        loginCheck();
        fetchDatas();
    }, [])

    return (
        <>
            <h1>구호소 상세</h1>
            {read.map((v, i) => (
                <>
                    <table className="tablelist">
                        <thead>
                            <tr>
                                <th>구호소코드</th>
                                <th>{v.shelter_id}</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>구호소이름</td>
                                <td colSpan="3">{v.shelter_name}</td>
                            </tr>
                            <tr>
                                <td>최대수용인원</td>
                                <td colSpan="3">{(v.shelter_quantity).toLocaleString('ko-KR')}</td>
                            </tr>
                            <tr>
                                <td>카테고리</td>
                                <td colSpan="3">{v.shelter_category}</td>
                            </tr>
                            <tr>
                                <td>주소</td>
                                <td colSpan="3">{v.shelter_address}</td>
                            </tr>
                            <tr>
                                <td>연락처</td>
                                <td colSpan="3">{telReg(v.shelter_tel)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to={`/shelter/input/${v.shelter_id}`}><button>수정</button></Link>
                    <button onClick={() => {dataDelete(v)}}>삭제</button>
                    <br/><br/>
                </>
            ))}
        </>
    )                         


}

export default View;