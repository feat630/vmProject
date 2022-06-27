import React, { useEffect, useState } from "react"; 
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const Input = () => {
    let navigate = useNavigate();

    const [name, setName] = useState();
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState();
    const [address, setAddress] = useState();
    const [tel, setTel] = useState();
    const {index} = useParams();

    const fetchDatas = async() => {
        if(index) {
            const response = await axios.get(`http://localhost:4000/shelter/getOne/${index}`);
            setName(response.data[0].shelter_name);
            setQuantity(response.data[0].shelter_quantity);
            setCategory(response.data[0].shelter_category);
            setAddress(response.data[0].shelter_address);
            setTel(response.data[0].shelter_tel);
        } else {

        }
    }

    const regSpecial = (str, name, input) => { 
        const regExp = /[\sa-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g;
        if(regExp.test(str)) {

        }else{
            if(str === '' || str == null){

            } else {
                alert("특수문자는 입력이 불가합니다")
                input.value=null;
            }
        } 
    }

    const getValue = (e) => {
		const { name, value } = e.target;
        regSpecial(value.slice(value.length-1, value.length, e.target), name)
        
    	if(name === 'name') {
			setName(value);
		} else if(name === 'quantity') {
			setQuantity(value);
		} else if(name === 'category') {
			setCategory(value);
		} else if(name === 'address') {
			setAddress(value);
		} else if(name === 'tel') {
			setTel(value);
		}
	}

    const dataInsert = async() => {
        if(name === "" || quantity === "" || category === "" || address === "" || tel === ""){
            alert("모두 입력해주세요")
        } else if(name == null || quantity == null || category == null || address == null || tel == null){
            alert("모두 입력해주세요")
        } else {
            await axios.post('/shelter/postData',{
                data: {'data': [
                    name,
                    quantity,
                    category,
                    address,
                    tel]
                }
            });
            navigate("/shelter");
        }
    }

    const dataUpdate = async() => {
        if(name === "" || quantity === "" || category === "" || address === "" || tel === ""){
            alert("모두 입력해주세요")
        } else if(name == null || quantity == null || category == null || address == null || tel == null){
            alert("모두 입력해주세요")
        } else {
            await axios.post('/shelter/updateData',{
                data: {'data': [
                    index,
                    name,
                    quantity,
                    category,
                    address,
                    tel]
                }
            });
            navigate("/shelter");
        }
    }

    const loginCheck = async() => {
        const status = await axios.get('/login/status', "",{ withCredentials: true });
        console.log(status.data)
        if(!status.data) {
            navigate("/");
            console.log("로그아웃상태")
        } else{
            console.log("로그인상태")
        }
    }

    const maxLengthCheck = (num, name) => {
        if(num==null){
            // console.log(num)
        } else if (num.length > 11) {
            if(name==="tel"){
                setTel(num.slice(0, 11));
            } else if(name==="quantity"){
                setQuantity(num.slice(0, 11));
            }
            
        } 
    }

    useEffect( () => {
        loginCheck();
        fetchDatas();
    }, [])


    if(!index){
        return (
            <>
                <span>{index}</span>
                <br/>
                <h1>신규 구호소 등록</h1>
                구호소명<br/>
                <input
                        className="name-input"
                        type='text'
                        placeholder='구호소명'
                        value={name}
                        onChange={getValue}
                        name='name'
                    >
                    </input><br/><br/>
                최대수용인원<br/>
                <input
                        className="quantity-input"
                        type='number'
                        placeholder='최대수용인원'
                        value={quantity}
                        onChange={getValue}
                        name='quantity'
                        oninput={maxLengthCheck(quantity, 'quantity')}
                    >
                    </input><br/><br/>
                카테고리<br/>
                <input
                    className="category-input"
                    type='text'
                    placeholder='카테고리'
                    value={category}
                    onChange={getValue}
                    name='category'
                >
                </input><br/><br/>
                주소<br/>
                <input
                        className="address-input"
                        type='text'
                        placeholder='주소'
                        value={address}
                        onChange={getValue}
                        name='address'
                    >
                    </input><br/><br/>
                연락처<br/>
                <input
                        className="tel-input"
                        type='number'
                        placeholder='(-)없이 숫자만 입력'
                        value={tel}
                        onChange={getValue}
                        name='tel'
                        oninput={maxLengthCheck(tel, 'tel')}
                    >
                    </input><br/><br/>
                    
                <button onClick={() => {dataInsert()}}>제출하기</button><br></br>
                <br/>
            </>
        )
    } else {
        return (
            <>
                <br/>
                <h1>구호소 업데이트{index}</h1>
                구호소명<br/>
                <input
                        className="name-input"
                        type='text'
                        placeholder='구호소명'
                        value={name}
                        onChange={getValue}
                        name='name'
                    >
                    </input><br/><br/>
                최대수용인원<br/>
                <input
                        className="quantity-input"
                        type='number'
                        placeholder='최대수용인원'
                        value={quantity}
                        onChange={getValue}
                        name='quantity'
                    >
                    </input><br/><br/>
                카테고리<br/>
                <input
                    className="category-input"
                    type='text'
                    placeholder='카테고리'
                    value={category}
                    onChange={getValue}
                    name='category'
                >
                </input><br/><br/>
                주소<br/>
                <input
                        className="address-input"
                        type='text'
                        placeholder='주소'
                        value={address}
                        onChange={getValue}
                        name='address'
                    >
                    </input><br/><br/>
                연락처<br/>
                <input
                    className="tel-input"
                    type='number'
                    placeholder='(-)없이 숫자만 입력'
                    value={tel}
                    onChange={getValue}
                    name='tel'
                    oninput={maxLengthCheck(tel)}
                    >
                    </input><br/><br/>
                <button onClick={() => {dataUpdate()}}>제출하기</button><br></br>
                <br/>
            </>
        )
    }
    


}

export default Input;