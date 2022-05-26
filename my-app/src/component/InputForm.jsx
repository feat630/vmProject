import axios from "axios";
import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

export const InputForm = () => {


    const [read, setRead] = useState([]);

    const [name, setName] = useState([]);
    const [age, setAge] = useState([]);
    const [etc, setEtc] = useState([]);

    const fetchDatas = async() => {
        const response = await axios.get('http://localhost:4000/getData');
        setRead(response.data);
    }

    const dataInsert = () => {
        console.log(name);
        console.log(age);
        console.log(etc);
		axios.post('http://localhost:4000/postData',{
			data: {'data': [
				name,
				age, 
				etc]
			}
		});
        console.log(name);
        fetchDatas();
	}

    const dataDelete = (value) => {
        console.log(value[0]);
        console.log(value[1]);
        console.log(value[2]);
    }

    const getValue = (e) => {
		const { name, value } = e.target;
    	if(name === 'name') {
			setName(value);
		} else if (name === 'age'){
			setAge(value);
		} else {
			setEtc(value);
		}
	}

    const onReset = () => {
        setName("");
        setAge("");
        setEtc("");
    }

    useEffect(() => {
        fetchDatas();
    },[]);

    return (
        <>
            이름:<input
                    className="name-input"
                    type='text'
                    placeholder='이름'
                    value={name}
                    onChange={getValue}
                    name='name'
                >
                </input><br/>
            나이:<input
                    className="age-input"
                    type='text'
                    placeholder='나이'
                    value={age}
                    onChange={getValue}
                    name='age'
                >
                </input><br/>
            추가사항:<input
                    className="etc-input"
					type='text'
					placeholder='추가사항'
                    value={etc}
					onChange={getValue}
					name='etc'
                >
                </input><br/>
            <Link to="/inputform"><button onClick={() => {dataInsert(); onReset()}}>제출하기</button></Link><br></br>
            <br/>

            <div>입력목록보기</div>

            <table className="tablelist">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>age</th>
                        <th>etc</th>
                    </tr>
                </thead>
                <tbody>
                    {read.map((v, i) => (
                    <tr>
                        <td key={v.name}>{v.name}</td>
                        <td key={v.age}>{v.age}</td>
                        <td key={v.test_data}>{v.test_data}</td>
                        <td><button value={v.name} onClick={() => {dataDelete([v.name, v.age, v.test_data])}}>삭제</button></td>
                        <td><button>수정</button></td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )


}

export default InputForm;