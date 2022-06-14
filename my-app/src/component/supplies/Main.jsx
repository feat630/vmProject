import React from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom"

export const Main = () => {
        const style={
            backgroundColor:'pink',
            borderCollapse : 'collapse',
            border:'1px solid black',
        }
   

    return (
        <>
            <br/>
            <h1>배급품</h1>
            <div style={{fontWeight:"700"}} >배급품 현황리스트</div>
            <br></br>
            
            <Link to="/supplies/input"><button>등록</button></Link> &nbsp;&nbsp;
            <Link to="/supplies/view"><button>수정</button> </Link> <br/><p></p>

            <table style={{marginTop:-10}} className="tablelist">
              <thead style={style} >
              <tr>
               <th>배급품명</th>
               <th>수량</th>
               </tr>
              </thead>

              <tbody>
                <td></td>
                <td></td>
             
                 {/* <button>삭제 이건 주석</button></td>*/}
               
               
              </tbody>
            </table>
        </>
    )


}

export default Main;