import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Input= () => {
    const [read,setRead] =useState([]);
    const [type, setType] = useState([]);
    const [name, setName] = useState([]);
    const [place, setPlace] = useState([]);
    const [total, setTotal] = useState([]);
    const [distribution, setDistribution] = useState([]);
    const [damage, setDamage] = useState([]);
    const [possibility, setPossibility] = useState([]);
   
const fetchDatas =async() => {
    const response = await axios.get ('http://localhost:4000/supplies/main');
    setRead(response.data);
}

    const dataInsert = () => {
        console.log(type);
        console.log(name);
        console.log(place);
        console.log(total);
        console.log(distribution);
        console.log(damage);
        console.log(possibility);
        if (name.length === 0  || place.length ===0 ||
        total.length=== 0 || distribution.length === 0 || damage.length === 0 || possibility.length ===0
        ) {
            alert('입력이 안되었습니다.')
           } else {
            alert('등록되었습니다.')
            window.location.href="/supplies/main"
           }

		axios.post('http://localhost:4000/supplies/input',{
			data: {'data': [type, name, place, total,distribution, damage,possibility]}
		});
        console.log(name);
        fetchDatas();
	}
    


    const getValue = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        if (name === "type") {
          setType(value);
        } else if (name === "name") {
          setName(value);
        } else if (name === "place") {
          setPlace(value);
        } else if (name === "total") {
            setTotal(value);
        } else if (name === "distribution") {
            setDistribution(value);
        } else if (name === "damage") {
            setDamage(value);
        } else if (name === "possibility") {
            setPossibility(value);
        } 
      };

    const onReset = () => {
        setType(""); 
        setName("");
        setPlace("");
        setTotal("");
        setDistribution("");
        setDamage("");
        setPossibility("");
    }

    useEffect(() => {
        fetchDatas();
    },[]);

    return (
        <>
        <br></br>
        <br></br>
        <br></br>
      <center id="type">
      &emsp;&ensp;&nbsp;&nbsp;구분 : &emsp;&ensp;&nbsp;&nbsp;
        <select name="type" className="type-option"  onChange={getValue} >
        <option>선택해주세요</option>
        <option value="A">가구당</option>
        <option value="B">개인당</option>
        <option value="C">자율</option>
        <option value="E">기타</option>
      </select>
      <br />
      <br></br>
    </center>
    <center id="name">
      &emsp;&ensp;&nbsp;&nbsp;배급품이름 :
      <input
        className="text-input"
        type="text"
        placeholder='배급품이름'
        value={name}
        name="name"
        onChange={getValue}
      ></input>
      <br />
      <br></br>
    </center>
    <center id="place">
    &emsp;&ensp;&nbsp;&nbsp;제공기관 :
    <input
      className="text-input"
      type="text"
      placeholder='제공기관'
      value={place}
      name="place"
      onChange={getValue}
    ></input>
    <br />
    <br></br>
  </center>
  <center id="total">
  &emsp;&ensp;&nbsp;&nbsp;총 수량 :
  <input
    className="number-input"
    type="text"
    placeholder='총 수량'
    value={total}
    name="total"
    onChange={getValue}
  ></input>
  <br />
  <br></br>
</center>
<center id="distribution">
&emsp;&ensp;&nbsp;&nbsp;배급수량 :
<input
  className="number-input"
  type="text"
  placeholder='배급수량'
  value={distribution}
  name="distribution"
  onChange={getValue}
></input>
<br />
<br></br>
</center>
<center id="damage">
&emsp;&ensp;&nbsp;&nbsp;파손수량 :
<input
className="number-input"
type="text"
placeholder='파손수량'
value={damage}
name="damage"
onChange={getValue}
></input>
<br />
<br></br>
</center>
<center id="possibility">
&emsp;&ensp;&nbsp;&nbsp;배급가능수량 :
<input
className="number-input"
type="text"
placeholder='배급가능수량'
value={possibility}
name="possibility"
onChange={getValue}
></input>
<br />
<br></br>
</center>
                <br></br>
            <button  className ="add-btn" onClick={() => {dataInsert(); onReset()}}>등록</button>&nbsp;&nbsp;
            <Link to="/supplies/main"><button  className="cancel-btn">취소</button></Link><br></br>
            <br></br>
            <br/>

            
        </>
    )


}

export default Input;