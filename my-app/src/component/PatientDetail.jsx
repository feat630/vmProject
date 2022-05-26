import React, { useEffect, useState } from "react"; 
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const PatientDetail = () => {
    const [read, setRead] = useState([]);
    const {index} = useParams();

    const fetchDatas = async() => {
        const response = await axios.get(`http://localhost:4000/getOne/${index}`);
        setRead(response.data);
    }

    useEffect( () => {
        fetchDatas();
    }, [])

    return (
        <>
            <h1>환자상세</h1>
            <h2>{index}</h2>
            <Link to={`/recordinput/${index}`}><button>새 진료기록 추가</button></Link><br/>
            <Link to= "/patientlist"><button>목록으로 돌아가기</button></Link>
            {read.map((v, i) => (
                <>
                    <table className="tablelist">
                        <thead>
                            <tr>
                                <th>환자식별코드</th>
                                <th>{v.key_value}</th>
                                <th>날짜</th>
                                <th>{v.date}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>진단기록</td>
                                <td colSpan="3">{v.medical_record}</td>
                            </tr>
                            <tr>
                                <td>기타</td>
                                <td colSpan="3">{v.etc}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                </>
            ))}
        </>
    )
}

export default PatientDetail;