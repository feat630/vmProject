import React, { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Main = () => {

    const [read, setRead] = useState([]);
    const [upt, setUpt] = useState(false);

    const fetchDatas = async() => {
        const response = await axios.get('http://localhost:4000/shelter/getData', { withCredentials: true });
        setRead(response.data.rows);
        setUpt(true);
        console.log(read)
    }

    useEffect(() => {
        fetchDatas();
    },[upt]);
 
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
                            <td key={v.shelter_quantity+v.shelter_id+v.shelter_quantity}>{v.shelter_quantity}</td>
                            <td key={v.shelter_tel+v.shelter_id+v.shelter_tel}>{v.shelter_tel}</td>
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