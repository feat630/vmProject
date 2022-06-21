import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import View from "./View";
import "./victim.css";

export const Main = () => {
  const [victims, setVictims] = useState([]);
  const [selectedVictim, setSelectedVictim] = useState(null);

  const selectVictim = (victim) => {
    setSelectedVictim(victim);
  };

  const fetchDatas = async () => {
    const response = await axios.get("http://localhost:4000/victim/list");
    setVictims(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    console.log("useEffect!!!");
    fetchDatas();
  }, []);

  return (
    <>
      <br />
      <h1>이재민 리스트</h1>
      {selectedVictim && <View victim={selectedVictim} />}
      <Link to="/victim/register">
        <button className="victim-btn">이재민 등록</button>
      </Link>
      <Link to="/shelter">
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
          </tr>
        </thead>
        <tbody>
          {victims.map((victim) => (
            <tr key={victim.victim_id} onVictimClick={selectVictim}>
              <td>{victim.victim_id}</td>
              <td>
                <Link to={`/victim/detail/${victim.victim_id}`}>
                  <div>{victim.name}</div>
                </Link>
              </td>
              <td>{victim.gender}</td>
              <td>{victim.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Main;
