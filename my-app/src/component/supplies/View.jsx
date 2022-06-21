import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "./supplies.css";

const View = (props) => {
  const [supplies, setSupplies] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  console.log(supplies);

  let { no } = useParams();
  console.log(supplies);
  console.log(no);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4000/supplies/detail/${no}`
    );
    // setSupplies(response.data);
    setSupplies(response.data[0]);
    setName(supplies.name); 
    setQuantity(supplies.quantity);
  };

  const getValue = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "quantity") {
      setQuantity(value);
    }
  };
  const dataChange = () => {
    console.log(name);
    console.log(quantity);

  axios.post( `http://localhost:4000/supplies/update`,{
    data: {'data': [name, quantity, no]}
  });
 // console.log(name);
  // fetchData();
}

  const dataDelete = () => {
    console.log(name);
    console.log(quantity);

    axios.delete(`http://localhost:4000/supplies/delete/${no}`, {
      // data: {'data': [no]}
    });
    console.log(name);
    fetchData();
  };

  const onReset = () => {
    setName("");
    setQuantity("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <br></br>
      <form>
        <center id="name">
          배급품명* :{" "}
          <input
            className="name-input"
            onChange={getValue}
            type="text"
            value={supplies.name}
            name="name"
          ></input>
          <br />
          <br></br>
        </center>
        <center id="quantity">
          &emsp;&ensp;&nbsp;&nbsp;수량* :{" "}
          <input
            className="quantity-input"
            onChange={getValue}
            type="text"
            value={supplies.quantity}
            name="quantity"
          ></input>
          <br />
        </center>
        <br></br>
        <br></br>
        <br></br>
        <center>
          <Link to="/supplies/main">
            <button
              type="submit"
              className="add-btn"
              onClick={() => {
                dataChange();
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
          &nbsp;&nbsp;
          <Link to="/supplies/main">
            <button
              className="delete-btn"
              onClick={() => {
                dataDelete();
                onReset();
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
