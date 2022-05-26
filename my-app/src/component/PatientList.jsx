import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";

export const PatientList = () => {

    const [read, setRead] = useState([]);

    const fetchDatas = async() => {
        const response = await axios.get('http://localhost:4000/getPatient');
        setRead(response.data);
    }

    useEffect(() => {
        fetchDatas();
    },[]);

    return (
        <>
            <h1>환자목록</h1>

            <table className="tablelist">
                <thead>
                    <tr>
                        <th>환자식별코드</th>
                        <th>이름</th>
                        <th>성별</th>
                        <th>나이</th>
                    </tr>
                </thead>
                <tbody>
                    {read.map((v, i) => (
                        <tr>
                            <td key={v.key_value}><Link to={`/patientdetail/${v.key_value}`}>{v.key_value}</Link></td>
                            <td key={v.name}>{v.name}</td>
                            <td key={v.gender}>{v.gender}</td>
                            <td key={v.age}>{v.age}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>


        </>
    )


}

export default PatientList;