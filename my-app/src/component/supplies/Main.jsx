import React ,{useEffect, useState} from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import axios from "axios";
import "./supplies.css";
import View from "./View";

export const Main = () => {
        const [read,setRead] = useState([]);
        const [type,setType] = useState([]);
        
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

        const fetchDatas = async() => {
          const response = await axios.get("http://localhost:4000/supplies/main");
          setRead(response.data);
          console.log(response.data);
        }

        useEffect(() => {
          fetchDatas();
      },[]);

    return (
        <>
            <br/>
            <h1>배급품</h1>
            <div style={{fontWeight:"700"}} >배급품 현황리스트</div>
            <br></br>
            
            <Link to="/supplies/input"><button  className ="add-btn">등록</button></Link> &nbsp;&nbsp;
            <br></br>
            <br></br>

            <table style={{marginTop:-10}} className="supplies-tablelist">
              <thead className = "supplies-thead" >
              <tr>
              <th>번호</th>
              <th>구분</th>
               <th>배급품 이름</th>
               <th>제공기관</th>
               <th>총 수량</th>
               <th>배급수량</th>
               <th>파손수량</th>
               <th>배급가능수량</th>
               </tr>
              </thead>

              <tbody className = "supplies-tbody">
               {read.map((supplies) => (
                <tr key={supplies.no}>
                <td >{supplies.no}</td>
                <td >{checkType(supplies.type)}</td>
                <td ><Link to={`/supplies/detail/${supplies.no}`}><button  className="name-btn">{supplies.name}</button></Link></td>
                <td >{supplies.place}</td>
                <td >{supplies.total}</td>
                <td >{supplies.distribution}</td>
                <td >{supplies.damage}</td>
                <td >{supplies.possibility}</td>
                </tr>
               ))
               }
             
                 {/* <button>삭제 이건 주석</button></td>*/}
               
               
              </tbody>
            </table>
        </>
    )


}

export default Main;