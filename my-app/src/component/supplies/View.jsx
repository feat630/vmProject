import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./supplies.css";

const View = (props) => {
  const [supplies, setSupplies] = useState([]);

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

  
  console.log(supplies);

  let { no } = useParams();


  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4000/supplies/detail/${no}`
    );
    // setSupplies(response.data);
    setSupplies(response.data[0]);
  
  };



  const dataDelete = () => {

    axios.delete(`http://localhost:4000/supplies/delete/${no}`, {
      // data: {'data': [no]}
    });
    return;
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <br></br>
    <br></br>
    <br></br>
      <form>
      <center id="type">
      구분 :
      <input
        className="type-input"
        type="text"
        value={checkType(supplies.type)}
        name="type"
      ></input>
      <br />
      <br></br>
    </center>
    <center id="name">
      &emsp;&ensp;&nbsp;&nbsp;배급품이름 :
      <input
        className="supplies-text-input"
        type="text"
        value={supplies.name}
        name="name"
      ></input>
      <br />
      <br></br>
    </center>
    <center id="place">
    &emsp;&ensp;&nbsp;&nbsp;제공기관 :
    <input
      className="supplies-text-input"
      type="text"
      value={supplies.place}
      name="place"
    ></input>
    <br />
    <br></br>
  </center>
  <center id="total">
  &emsp;&ensp;&nbsp;&nbsp;총 수량 :
  <input
    className="supplies-number-input"
    type="text"
    value={supplies.total}
    name="total"
  ></input>
  <br />
  <br></br>
</center>
<center id="distribution">
&emsp;&ensp;&nbsp;&nbsp;배급수량 :
<input
  className="supplies-number-input"
  type="text"
  value={supplies.distribution}
  name="distribution"
></input>
<br />
<br></br>
</center>
<center id="damage">
&emsp;&ensp;&nbsp;&nbsp;파손수량 :
<input
className="supplies-number-input"
type="text"
value={supplies.damage}
name="damage"
></input>
<br />
<br></br>
</center>
<center id="possibility">
&emsp;&ensp;&nbsp;&nbsp;배급가능수량 :
<input
className="supplies-number-input"
type="text"
value={supplies.possibility}
name="possibility"
></input>
<br />
<br></br>
</center>
        <br></br>
        <br></br>
        <br></br>
        <center>
        <Link to={`/supplies/update/${no}`}>
        <button
          className="change-btn"
        >
          수정
        </button>
      </Link>
          &nbsp;&nbsp;
          <Link to="/supplies/main">
            <button className="cancel-btn">취소</button>
          </Link>
          &nbsp;&nbsp;
          <Link to="/supplies/main">
          <button
            className="delete-btn"
            onClick={() => {
              dataDelete();
            }}
          >
            삭제
          </button>
        </Link>
          <br></br>
        </center>
      </form>
      <br></br>
      <br />
    </>
  );
};

export default View;
