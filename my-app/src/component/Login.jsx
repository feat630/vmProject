import React, { useState } from "react"; 
import { useNavigate  } from "react-router-dom";
import axios from "axios";

export const Login = () => {
    let navigate = useNavigate();

    const [id, setId] = useState();
    const [pw, setPw] = useState();

    const getValue = (e) => {
		const { name, value } = e.target;
    	if(name === 'id') {
			setId(value);
		} else {
			setPw(value);
		}
	}

    const dataCheck = async() => {
        const response = await axios.post('/login/check',{
			data: {'data': [
				id,
				pw]
			}
		}, { withCredentials: true });
        console.log(response.data[0])
        if(response.data[0]==null) {
            alert("아이디, 비밀번호가 틀렸습니다");
            console.log("실패")
            navigate("/");
        } else {
            console.log("성공")
            navigate("../main");
        }

    }


    return (
        <>
            <br/>
            <h1>Login</h1>
            id <input
                    
                    className="id-input"
                    type='text'
                    placeholder='id'
                    value={id}
                    onChange={getValue}
                    name='id'
                >
                </input><br/>
            pw <input
                    
                    className="pw-input"
                    type='password'
                    placeholder='pw'
                    value={pw}
                    onChange={getValue}
                    name='pw'
                >
                </input><br/>
            <button onClick={() => {dataCheck()}}>제출하기</button><br></br>
            <br/>
        </>
    )

}

export default Login;