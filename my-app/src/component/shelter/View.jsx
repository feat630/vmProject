import React, { useEffect, useState } from "react"; 
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const View = () => {

    const [read, setRead] = useState([]);
    const {index} = useParams();

    const fetchDatas = async() => {
        const response = await axios.get(`http://localhost:4000/shelter/getOne/${index}`);
        await setRead(response.data);
        await console.log(read)
    }

    const dataDelete = (v) => {
        axios.post('/shelter/deleteData',{
			data: {'data': [
				v.shelter_id]
			}
		});
    }

    useEffect( () => {
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
                                <td colSpan="3">{v.shelter_quantity}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to={`/shelter/input/${v.shelter_id}`}><button>수정</button></Link>
                    <Link to="/shelter"><button onClick={() => {dataDelete(v)}}>삭제</button></Link>
                    <br/><br/>
                </>
            ))}
        </>
    )                         


}

export default View;