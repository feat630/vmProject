import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";

export const PatientInput = () => {

    const [keyValue, setKeyValue] = useState([]);
    const [name, setName] = useState([]);
    const [gender, setGender] = useState([]);
    const [age, setAge] = useState([]);
    const [medicalRecord, setMedicalRecord] = useState([]);
    const [etc, setEtc] = useState([]);


    const dataInsert = () => {
        console.log(keyValue);
        console.log(name);
        console.log(gender);
        console.log(age);
        console.log(medicalRecord);
        console.log(etc);
		axios.post('http://localhost:4000/insertPatient',{
			data: {'data': [
                keyValue,
                name,
                gender,
				age,
				medicalRecord, 
				etc]
			}
		});
        console.log(name);
	}

    const getValue = (e) => {
		const { name, value } = e.target;
    	if(name === 'keyValue') {
			setKeyValue(value);
		} else if (name === 'name'){
			setName(value);
		} else if (name === 'gender'){
			setGender(value);
		} else if (name === 'age'){
			setAge(value);
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
                    onChange={getValue}
                    name='keyValue'
                >
                </input><br/>
            이름:<input
                    className="name-input"
                    type='text'
                    placeholder='이름'
                    onChange={getValue}
                    name='name'
                >
                </input><br/>
            성별:<input
                    className="gender-input"
					type='text'
					placeholder='성별'
					onChange={getValue}
					name='gender'
                >
                </input><br/>
            나이:<input
                className="age-input"
                type='text'
                placeholder='나이'
                onChange={getValue}
                name='age'
            >
            </input><br/>
                    
            <Link to="/patientlist"><button onClick={() => {dataInsert()}}>작성완료</button></Link><br></br>
        </>
    )


}

export default PatientInput;