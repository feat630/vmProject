import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";

const Input= () => {
    const [read,setRead] =useState([]);
    const [type, setType] = useState([]);
    const [name, setName] = useState([]);
    const [place, setPlace] = useState([]);
    const [total, setTotal] = useState([]);
    const [distribution, setDistribution] = useState([]);
    const [damage, setDamage] = useState([]);
    const [possibility, setPossibility] = useState([]);
    const [nameMessage, setNameMessage] = useState("");
    const [placeMessage, setPlaceMessage] = useState("");
    const [amount, setAmount] = useState("");
    const [amountMessage, setAmountMessage] = useState("");
    const [amountMessage2, setAmountMessage2] = useState("");
    const [amountMessage3, setAmountMessage3] = useState("");
    const [amountMessage4, setAmountMessage4] = useState("");
    const [amountMessage5, setAmountMessage5] = useState("");
    const [amountMessage6, setAmountMessage6] = useState("");
    const [amountMessage7, setAmountMessage7] = useState("");
    const [amountMessage8, setAmountMessage8] = useState("");
    const [amountMessage9, setAmountMessage9] = useState("");
    const [amountMessage10, setAmountMessage10] = useState("");
    const [amountMessage11, setAmountMessage11] = useState("");
    const [amountMessage12, setAmountMessage12] = useState("");
    const[numbermessage,setNumberMessage] = useState("");
 
    const navigate = useNavigate();
   
const fetchDatas =async() => {
    const response = await axios.get ('http://localhost:4000/supplies/main');
    setRead(response.data);
}
 
const onChangeAmount= (e) => {
  const { value } = e.target;
  const amountRegex = /^[0-9]*$/;
  if (!amountRegex.test(e.target.value)) {
    setAmountMessage("숫자만 입력 가능합니다.");
  } else if (e.target.value <= 0 ) {
    setAmountMessage2("1부터 입력 가능합니다.");
  }  else {
    setAmountMessage3("")
  }
  // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
  const onlyNumber = value.replace(/[^0-9]/g, "");
setTotal(onlyNumber);
};

const onChangeAmount2= (e) => {
  const { value } = e.target;
  const amountRegex2 = /^[0-9]*$/;
  if (!amountRegex2.test(e.target.value)) {
    setAmountMessage4("숫자만 입력 가능합니다.");
  } else if (e.target.value < 0 ) {
    setAmountMessage5("0부터 입력 가능합니다.");
  }  else {
    setAmountMessage6("")
  }
  // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
  const onlyNumber = value.replace(/[^0-9]/g, "");
  setDistribution(onlyNumber);
};


const onChangeAmount3= (e) => {
  const { value } = e.target;
  const amountRegex3 = /^[0-9]*$/;
  if (!amountRegex3.test(e.target.value)) {
    setAmountMessage7("숫자만 입력 가능합니다.");
  } else if (e.target.value < 0 ) {
    setAmountMessage8("0부터 입력 가능합니다.");
  }  else {
    setAmountMessage9("")
  }
  // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
  const onlyNumber = value.replace(/[^0-9]/g, "");
  setDamage(onlyNumber);
};

const onChangeAmount4= (e) => {
  const { value } = e.target;
  const amountRegex4 = /^[0-9]*$/;
  if (!amountRegex4.test(e.target.value)) {
    setAmountMessage10("숫자만 입력 가능합니다.");
  } else if (e.target.value < 0 ) {
    setAmountMessage11("0부터 입력 가능합니다.");
  }  else {
    setAmountMessage12("")
  }
  // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
  const onlyNumber = value.replace(/[^0-9]/g, "");
  setPossibility(onlyNumber);
};

    

const onChangeText = (e) => {
  const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]*$/;
  if (!nameRegex.test(e.target.value)) {
    alert("문자만 입력 가능합니다.")
    setNameMessage("문자만 입력 가능합니다.");
    setName("");
  } else {
    setNameMessage("");
  }
};

const onChangeMessage = (e) => {
  const placeRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]*$/;
 // const regExp = /^[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]*$/;
  if ((!placeRegex.test(e.target.value))) {
    alert("문자만 입력 가능합니다.")
    setPlaceMessage("문자만 입력 가능합니다.");
    setPlace("");
  } else {
    setPlaceMessage("");
  }

};



    const dataInsert = async() => {
        console.log(type);
        console.log(name);
        console.log(place);
        console.log(total);
        console.log(distribution);
        console.log(damage);
        console.log(possibility);
     
      if (type.length ===0 || name.length === 0  || place.length ===0 ||
        total.length=== 0 || distribution.length === 0 || damage.length === 0 || possibility.length ===0
      ) {alert('입력이 안되었습니다.');
      return;
           } else {

	const response= await	axios.post('http://localhost:4000/supplies/input',{
			data: {'data': [type, name, place, total,distribution, damage,possibility]},
		}
    );
    if(response.status === 200) {
        console.log(name);
        alert('등록되었습니다.');
        navigate("/supplies");
    
	}
}
};
    


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
      <br></br>
      <br/>
    </center>
    
    <center id="name">
      &emsp;&ensp;&nbsp;&nbsp;배급품이름 :
      <input
        className="supplies-text-input"
        type="text"
        placeholder='배급품이름'
        value={name}
        name="name"
        onChange={(e) => {getValue(e);onChangeText(e);}}
      ></input>
      <div className="supplies-message">{nameMessage}</div>
     <br></br><br/>
    </center>

    <center id="place">
    &emsp;&ensp;&nbsp;&nbsp;제공기관 :
    <input
      className="supplies-text-input"
      type="text"
      placeholder='제공기관'
      value={place}
      name="place"
      onChange={(e) => {getValue(e);onChangeMessage(e);}}
    ></input>
    <div className="supplies-message">{placeMessage}</div>
    <br></br><br/>
  </center>

  <center id="total">
  &emsp;&ensp;&nbsp;&nbsp;총 수량 :
  <input
    className="supplies-number-input"
    type="text"
    placeholder='총 수량'
    value={total}
    name="total"
    onChange={(e) => {getValue(e); onChangeAmount(e);}}
  ></input>
  <div className="supplies-message">{amountMessage}&nbsp;&nbsp;{amountMessage2}</div>
  <div className="supplies-message2">{numbermessage}</div>
  <br/>
</center>

<center id="distribution">
&emsp;&ensp;&nbsp;&nbsp;배급수량 :
<input
  className="supplies-number-input"
  type="text"
  placeholder='배급수량'
  value={distribution}
  name="distribution"
  min='0'
  onChange={(e) => {getValue(e); onChangeAmount2(e)}}
  onkeyup="this.value=this.value.replace(/[^0-9]/g,'');"
></input>
<div className="supplies-message">{amountMessage4}&nbsp;&nbsp;{amountMessage5}</div>
<br/>
</center>

<center id="damage">
&emsp;&ensp;&nbsp;&nbsp;파손수량 :
<input
className="supplies-number-input"
type="text"
placeholder='파손수량'
value={damage}
name="damage"
min='0'
onChange={(e) => {getValue(e); onChangeAmount3(e)}}
onkeyup="this.value=this.value.replace(/[^0-9]/g,'');"
></input>
<div className="supplies-message">{amountMessage7}&nbsp;&nbsp;{amountMessage8}</div>
<br/>
</center>

<center id="possibility">
&emsp;&ensp;&nbsp;&nbsp;배급가능수량 :
<input
className="supplies-number-input"
type="text"
placeholder='배급가능수량'
value={possibility}
name="possibility"
min='0'
onChange={(e) => {getValue(e); onChangeAmount4(e)}}
></input>
<div className="supplies-message">{amountMessage10}&nbsp;&nbsp;{amountMessage11}</div>
<br/>
</center>
                <br></br>
                <button  className ="add-btn" onClick={() => {dataInsert();}}>등록</button>&nbsp;&nbsp;
            <Link to="/supplies/main"><button  className="cancel-btn">취소</button></Link><br></br>
            <br></br>
            <br/>

            
        </>
    )


}


export default Input;