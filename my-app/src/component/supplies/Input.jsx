import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Input= () => {

    const [read, setRead] = useState([]);
    const [name, setName] = useState([]);
    const [quantity, setQuantity] = useState([]);
    
    

    const fetchDatas = async() => {
        const response = await axios.get('http://localhost:4000/getData');
        setRead(response.data);
    }

    const dataInsert = () => {
        console.log(name);
        console.log(quantity);
       


		axios.post('http://localhost:4000/postData',{
			data: {'data': [
                name,
               quantity]
			}
		});
        console.log(name);
        fetchDatas();
	}

    const dataDelete = (value) => {
        console.log(value[0]);
        console.log(value[1]);
      
    }

    const getValue = (e) => {
		const { name, value } = e.target;
    	if(name === 'name') {
			setName(value);
        } else {
        setQuantity(value);
        }
	}

    const onReset = () => {
        setName("");
        setQuantity("");
    }

    useEffect(() => {
        fetchDatas();
    },[]);

    return (
        <>
        <br></br>
          <center>배급품명* : <input
                className="name-input"
                type='text'
                placeholder='배급품명'
                value={name}
                onChange={getValue}
                name='name'
            >
            </input><br/></center>
            <center>&emsp;&ensp;&nbsp;&nbsp;수량* : <input
                    className="quantity-input"
                    type='text'
                    placeholder='수량'
                    value={quantity}
                    onChange={getValue}
                    name='quantity'
                >
                </input><br/></center>
                <br></br>
                별표(*) 항목은 필수 입력입니다.
                <br></br><br></br>
            <Link to="/supplies/main"><button onClick={() => {dataInsert(); onReset()}}>등록</button></Link>&nbsp;&nbsp;
            <Link to="/supplies/main"><button>취소</button></Link><br></br>
            <br></br>
            <br/>

            
        </>
    )


}

export default Input;
