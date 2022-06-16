import React ,{useEffect, useState} from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import axios from "axios";
import "./supplies.css";
//import View from "./View";

export const Main = () => {
        const [read,setRead] = useState([]);
        
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
            
            <table style={{marginTop:-10}} className="tablelist">
              <thead >
              <tr>
              <th>번호</th>
               <th>배급품명</th>
               <th>수량</th>
               </tr>
              </thead>

              <tbody>
               {read.map((supplies) => (
                <tr>
                <td key={supplies.no}>{supplies.no}</td>
                <td key={supplies.name}><Link to={`/supplies/view ${supplies.name}`}>{supplies.name}</Link></td>
                <td key={supplies.quantity}>{supplies.quantity}</td>
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