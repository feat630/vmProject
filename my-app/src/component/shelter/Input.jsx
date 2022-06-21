import React, { useEffect, useState } from "react"; 
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const Input = () => {
    const [name, setName] = useState();
    const [quantity, setQuantity] = useState();
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
		} else {
			setQuantity(value);
		}
	}

    const dataInsert = () => {
        axios.post('/shelter/postData',{
			data: {'data': [
				name,
				quantity]
			}
		});
    }

    const dataUpdate = () => {
        axios.post('/shelter/updateData',{
			data: {'data': [
                index,
				name,
				quantity]
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