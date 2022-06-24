import React ,{useEffect, useState} from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import axios from "axios";
import "./supplies.css";
import View from "./View";

export const Main = () => {
        const [supplies,setSupplies] = useState([]);
        
        
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
          console.log(response.data);
          const activeUsers = response.data.filter(
            (supplies) => supplies.delete_yn === "N"
          );
          setSupplies(activeUsers);
          console.log(activeUsers);
        };
        

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
              <thead className = "supplies-thead"  >
              <tr>
              <th>번호</th>&emsp;&ensp;&nbsp;&nbsp;
              <th>구분</th>&emsp;&ensp;&nbsp;&nbsp;
               <th>배급품 이름</th>&emsp;&ensp;&nbsp;&nbsp;
               <th>제공기관</th>&emsp;&ensp;&nbsp;&nbsp;
               <th>총 수량</th>&emsp;&ensp;&nbsp;&nbsp;
               <th>배급수량</th>&emsp;&ensp;&nbsp;&nbsp;
               <th>파손수량</th>&emsp;&ensp;&nbsp;&nbsp;
               <th>배급가능수량</th>
               </tr>
              </thead>

              <tbody className = "supplies-tbody">
               {supplies.map((supplies) => (
                <tr key={supplies.no}>
                <td >{supplies.no}</td>&emsp;&ensp;&nbsp;&nbsp;
                <td >{checkType(supplies.type)}</td>&emsp;&ensp;&nbsp;&nbsp;
                <td ><Link to={`/supplies/detail/${supplies.no}`}><button  className="name-btn">{supplies.name}</button></Link></td>&emsp;&ensp;&nbsp;&nbsp;
                <td >{supplies.place}</td>&emsp;&ensp;&nbsp;&nbsp;
                <td >{supplies.total}</td>&emsp;&ensp;&nbsp;&nbsp;
                <td >{supplies.distribution}</td>&emsp;&ensp;&nbsp;&nbsp;
                <td >{supplies.damage}</td>&emsp;&ensp;&nbsp;&nbsp;
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