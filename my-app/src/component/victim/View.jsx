import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "./victim.css";

const View = (props) => {
  const [victim, setVictim] = useState([]);
  let { id } = useParams();

  const fetchDatas = async () => {
    const response = await axios.get(
      `http://localhost:4000/victim/detail/${id}`
    );
    setVictim(response.data[0]);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <>
      <h1>이재민 상세정보</h1>
      <div className="victim-view-wrapper">
        <div className="victim-view-row">
          <label>이름</label>
          <label>{victim.name}</label>
        </div>
        <div className="victim-view-row">
          <label>성별</label>
          <label>{victim.gender}</label>
        </div>
        <div className="victim-view-row">
          <label>나이</label>
          <label>{victim.age}</label>
        </div>
      </div>
    </>
  );
};

export default View;
