import React, { useEffect, useState } from "react"; 
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const Input = () => {
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
        } else {

        }
    }

    const getValue = (e) => {
		const { name, value } = e.target;
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

    const dataInsert = () => {
        axios.post('/shelter/postData',{
			data: {'data': [
				name,
				quantity,
                category,
                address,
                tel]
			}
		});
    }

    const dataUpdate = () => {
        axios.post('/shelter/updateData',{
			data: {'data': [
                index,
				name,
				quantity,
                category,
                address,
                tel]
			}
		});
    }

    useEffect( () => {
        fetchDatas();
    }, [])


    if(!index){
        return (
            <>
                <span>{index}</span>
                <br/>
                <h1>신규 구호소 등록</h1>
                구호소명:<input
                        className="name-input"
                        type='text'
                        placeholder='구호소명'
                        value={name}
                        onChange={getValue}
                        name='name'
                    >
                    </input><br/>
                최대수용인원:<input
                        className="quantity-input"
                        type='text'
                        placeholder='최대수용인원'
                        value={quantity}
                        onChange={getValue}
                        name='quantity'
                    >
                    </input><br/>
                카테고리:<input
                    className="category-input"
                    type='text'
                    placeholder='카테고리'
                    value={category}
                    onChange={getValue}
                    name='category'
                >
                </input><br/>
                주소:<input
                        className="address-input"
                        type='text'
                        placeholder='주소'
                        value={address}
                        onChange={getValue}
                        name='address'
                    >
                    </input><br/>
                연락처:<input
                        className="tel-input"
                        type='text'
                        placeholder='연락처'
                        value={tel}
                        onChange={getValue}
                        name='tel'
                    >
                    </input><br/>
                    
                <Link to="/shelter"><button onClick={() => {dataInsert()}}>제출하기</button></Link><br></br>
                <br/>
            </>
        )
    } else {
        return (
            <>
                <br/>
                <h1>구호소 업데이트{index}</h1>
                구호소명:<input
                        
                        className="name-input"
                        type='text'
                        placeholder='구호소명'
                        value={name}
                        onChange={getValue}
                        name='name'
                    >
                    </input><br/>
                최대수용인원:<input
                        
                        className="quantity-input"
                        type='text'
                        placeholder='최대수용인원'
                        value={quantity}
                        onChange={getValue}
                        name='quantity'
                    >
                    </input><br/>
                <Link to="/shelter"><button onClick={() => {dataUpdate()}}>제출하기</button></Link><br></br>
                <br/>
            </>
        )
    }
    


}

export default Input;