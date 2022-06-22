import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import View from "./View";
import "./victim.css";

export const Main = () => {
  const [victims, setVictims] = useState([]);

  const fetchDatas = async () => {
    const response = await axios.get("http://localhost:4000/victim/list");
    console.log(response.data);
    const activeUsers = response.data.filter(
      (victim) => victim.delete_yn === "N"
    );
    setVictims(activeUsers);
    console.log(activeUsers);
  };

  const checkGender = (gender) => {
    switch (gender) {
      case "M":
        return "남자";
      case "W":
        return "여자";
    }
  };

  useEffect(() => {
    console.log("useEffect!!!");
    fetchDatas();
  }, []);

  return (
    <>
      <br />
      <h1>이재민 리스트</h1>
      <Link to="/victim/register">
        <button className="victim-btn">이재민 등록</button>
      </Link>
      <Link to="/shelter/input">
        <button className="victim-btn">구호소 등록</button>
      </Link>
      <br />
      <table className="victim-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>이름</th>
            <th>성별</th>
            <th>나이</th>
            {/* <th>주소</th> */}
          </tr>
        </thead>
        <tbody>
          {victims.map((victim) => (
            <tr key={victim.victim_id}>
              <td>{victim.victim_id}</td>
              <td>
                <Link to={`/victim/detail/${victim.victim_id}`}>
                  <div>{victim.name}</div>
                </Link>
              </td>
              <td>{checkGender(victim.gender)}</td>
              <td>{victim.age}</td>
              {/* <td>{victim.address}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Main;
