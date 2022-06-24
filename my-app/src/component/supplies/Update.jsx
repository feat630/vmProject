import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./supplies.css";

const Update = (props) => {
    let [alert, setAlert] = useState(true);
  const [supplies, setSupplies] = useState([true]);
  const [name, setName] = useState([]);
  const [type, setType] = useState([]);
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


  
  console.log(name);
  console.log(type);
  console.log(place);
  console.log(total);
  console.log(distribution);
  console.log(damage);
 console.log(possibility);

  let { no } = useParams();

  console.log("no ",no);

  const navigate = useNavigate();

  const checkType = (type) => {
    switch(type) {
      case 'A': 
      return '가구당';
      
      case 'B':
        return '개인당';

      case 'C':
        return '자율';

      case 'E':
        return '기타';

    }
  }

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4000/supplies/detail/${no}`
    );
    setSupplies(response.data[0]);
    setName(supplies.name); 
    setType(supplies.type);
    setPlace(supplies.place);
    setTotal(supplies.total);
    setDistribution(supplies.distribution);
    setDamage(supplies.damage);
    setPossibility(supplies.possibility);
  };

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
    setAmount(onlyNumber);
  };
  
  const onChangeAmount2= (e) => {
    const { value2 } = e.target;
    const amountRegex2 = /^[0-9]*$/;
    if (!amountRegex2.test(e.target.value)) {
      setAmountMessage4("숫자만 입력 가능합니다.");
    } else if (e.target.value < 0 ) {
      setAmountMessage5("0부터 입력 가능합니다.");
    }  else {
      setAmountMessage6("")
    }
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber2 = value2.replace(/[^0-9]/g, "");
    setAmount(onlyNumber2);
  };
  
  
  const onChangeAmount3= (e) => {
    const { value3 } = e.target;
    const amountRegex3 = /^[0-9]*$/;
    if (!amountRegex3.test(e.target.value)) {
      setAmountMessage7("숫자만 입력 가능합니다.");
    } else if (e.target.value < 0 ) {
      setAmountMessage8("0부터 입력 가능합니다.");
    }  else {
      setAmountMessage9("")
    }
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber3 = value3.replace(/[^0-9]/g, "");
    setAmount(onlyNumber3);
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
    const onlyNumber4 = value.replace(/[^0-9]/g, "");
    setAmount(onlyNumber4);
  };
  
      
  
  const onChangeText = (e) => {
    const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]*$/;
    if (!nameRegex.test(e.target.value)) {
      setNameMessage("문자만 입력 가능합니다.");
    } else {
      setNameMessage("");
    }
  };
  
  
  const onChangeMessage = (e) => {
    const placeRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]*$/;
    if (!placeRegex.test(e.target.value)) {
      setPlaceMessage("문자만 입력 가능합니다.");
    } else {
      setPlaceMessage("");
    }
  };

  const updateData = () => {
  
  console.log(name);
  console.log(type);
  console.log(place);
  console.log(total);
  console.log(distribution);
  console.log(damage);
 console.log(possibility);
    axios.post(`http://localhost:4000/supplies/update`, {
      data: { data: [name ,type, place, total,distribution, damage,possibility,no] },
    });
  };

  const getValue = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "type") {
      setType(value);
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
    let timer = setTimeout(() => {
        setAlert(false);
      }, 100);
    fetchData();
  }, [alert]);

  return (
    <>
    <br></br>
    <br></br>
    <br></br>
    <form>
      <center id="type">
        구분 :
        <select name="type" className="type-option"  onChange={getValue} value={type} >
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
      <br></br>
      <br></br>
      <center>
        <Link to="/supplies/main">
          <button
            type="submit"
            className="change-btn"
            onClick={() => {
              updateData();
              alert("변경되었습니다");
            }}
          >
            변경
          </button>
        </Link>
        &nbsp;&nbsp;
        <Link to="/supplies/main">
          <button className="cancel-btn">취소</button>
        </Link>
        <br></br>
      </center>
    </form>
    <br></br>
    <br />
  </>
);
};


export default Update;
