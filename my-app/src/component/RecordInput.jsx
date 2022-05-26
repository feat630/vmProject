import React, { useEffect, useState } from "react"; 
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const RecordInput = () => {

    const {index} = useParams();

    const [keyValue, setKeyValue] = useState([]);
    const [medicalRecord, setMedicalRecord] = useState([]);
    const [etc, setEtc] = useState([]);


    const dataInsert = () => {
        console.log(index);
        console.log(medicalRecord);
        console.log(etc);
		axios.post('http://localhost:4000/insertRecord',{
			data: {'data': [
                index,
				medicalRecord, 
				etc]
			}
		});
	}

    const getValue = (e) => {
		const { name, value } = e.target;
    	if(name === 'keyValue') {
			setKeyValue(value);
		} else if (name === 'medicalRecord'){
			setMedicalRecord(value);
		} else if (name === 'etc'){
			setEtc(value);
		}
	}

    return (
        <>
            환자식별코드:<input
                    className="key-value-input"
                    type='text'
                    placeholder='식별코드'
                    value={index}
                    onChange={getValue}
                    name='keyValue'
                >
                </input><br/>
            진단기록:<input
                    className="medicalRecord-input"
                    type='text'
                    placeholder='진단기록'
                    onChange={getValue}
                    name='medicalRecord'
                >
                </input><br/>
            etc:<input
                    className="etc-input"
					type='text'
					placeholder='기타'
					onChange={getValue}
					name='etc'
                >
                </input><br/>
                    
            <Link to="/patientlist"><button onClick={() => {dataInsert()}}>작성완료</button></Link><br></br>
        </>
    )


}

export default RecordInput;