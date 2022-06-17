import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Input= () => {
    const [read,setRead] =useState([]);
    const [name, setName] = useState([]);
    const [quantity, setQuantity] = useState([]);
   
const fetchDatas =async() => {
    const response = await axios.get ('http://localhost:4000/supplies/main');
    setRead(response.data);
}

    const dataInsert = () => {
        console.log(name);
        console.log(quantity);
        if (name === "" || quantity === "") {
            alert('입력안된거있으니 확인 ㄱㄱ ')
           } else {
            alert('등록성공ㅎㅎㅎㅎ')
            window.location.href="/supplies/main"
           }

		axios.post('http://localhost:4000/supplies/input',{
			data: {'data': [name, quantity]}
		});
        console.log(name);
        fetchDatas();
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
          <center id="name">
                배급품명* : <input
                className="name-input"
                type='text'
                placeholder='배급품명'
                value={name}
                onChange={getValue}
                name='name'
            >
            </input><br/><br></br></center>
            <center id="quantity">&emsp;&ensp;&nbsp;&nbsp;수량* : <input
                    className="quantity-input"
                    type='text'
                    placeholder='수량'
                    value={quantity}
                    onChange={getValue}
                    name='quantity'
                >
                </input><br/></center>
                <br></br>
               <center className="warn"> 별표(*) 항목은 필수 입력입니다.</center>
                <br></br><br></br>
            <button  className ="add-btn" onClick={() => {dataInsert(); onReset()}}>등록</button>&nbsp;&nbsp;
            <Link to="/supplies/main"><button  className="cancel-btn">취소</button></Link><br></br>
            <br></br>
            <br/>

            
        </>
    )


}

export default Input;