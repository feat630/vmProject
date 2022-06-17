import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "./supplies.css";

const View = (props) => {
  const [supplies, setSupplies] = useState([]);
  const[name,setName] = useState('')
  const[quantity,setQuantity] = useState('')
  const{ changeInput,resetForm} =props 

  let { no } = useParams();
   console.log(supplies);
   console.log(no);

   const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4000/supplies/detail/${no}`
    );
    setSupplies(response.data[0]);
  };

   const saveBtnClick =(e) => {
    console.log(e) ; 
    e.preventDefault(0);

    const _inputData = {
        no:'',
        name:name,
        quantity:quantity
    }
   onmouseleave(_inputData);
   resetForm();
}
  
 const handleName =(e) => {
    setName(e.target.value)
 }

 const handleQuantity =(e) => {
    setQuantity(e.target.value)
 }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <br></br>
    <form onSubmit = {saveBtnClick} >
      <center id="name">
      배급품명* : <input
      className="name-input"
      onChange = {handleName}
      type='text'
      value={supplies.name}
      name='name'
  >
  </input><br/><br></br></center>
  <center id="quantity">&emsp;&ensp;&nbsp;&nbsp;수량* : <input
          className="quantity-input"
          onchange ={handleQuantity}
          type='text'
          value={supplies.quantity}
          name='quantity'
      >
      </input><br/></center>
      <br></br>
                <br></br><br></br>
                <center>
                <input type="hidden" name="no-input" onChange={changeInput} value={supplies.no} />
           <Link to="/supplies/main"><button  type="submit" className ="add-btn" onClick={() => {/*dataChange(); */ alert('변경되었습니다')}}>변경</button></Link>&nbsp;&nbsp;
            <Link to="/supplies/main"><button className="cancel-btn">취소</button></Link><br></br>
      </center>
      </form>
 <br></br>
            <br/> 
    </>
  );
};

export default View;