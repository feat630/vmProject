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
          className="text-input"
          type="text"
          value={name}
          onChange={getValue}
          name="name"
        ></input>
        <br />
        <br></br>
      </center>
      <center id="place">
      &emsp;&ensp;&nbsp;&nbsp;제공기관 :
      <input
        className="text-input"
        type="text"
        value={place}
        onChange={getValue}
        name="place"
      ></input>
      <br />
      <br></br>
    </center>
    <center id="total">
    &emsp;&ensp;&nbsp;&nbsp;총 수량 :
    <input
      className="number-input"
      type="text"
      value={total} 
      onChange={getValue}
      name="total"
    ></input>
    <br />
    <br></br>
  </center>
  <center id="distribution">
  &emsp;&ensp;&nbsp;&nbsp;배급수량 :
  <input
    className="number-input"
    type="text"
    value={distribution}
    onChange={getValue}
    name="distribution"
  ></input>
  <br />
  <br></br>
</center>
<center id="damage">
&emsp;&ensp;&nbsp;&nbsp;파손수량 :
<input
  className="number-input"
  type="text"
  value={damage}
  onChange={getValue}
  name="damage"
></input>
<br />
<br></br>
</center>
<center id="possibility">
&emsp;&ensp;&nbsp;&nbsp;배급가능수량 :
<input
  className="number-input"
  type="text"
  value={possibility}
  onChange={getValue}
  name="possibility"
></input>
<br></br>
<br />
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
