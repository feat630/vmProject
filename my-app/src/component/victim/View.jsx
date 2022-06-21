import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./victim.css";
import { useNavigate } from "react-router-dom";

const View = (props) => {
  const [victim, setVictim] = useState([]);
  let { id } = useParams();

  const navigate = useNavigate();

  const fetchDatas = async () => {
    const response = await axios.get(
      `http://localhost:4000/victim/detail/${id}`
    );
    setVictim(response.data[0]);
  };

  const DeleteData = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios.delete(`http://localhost:4000/victim/delete/${id}`);
      alert("삭제되었습니다.");
      navigate("/victim");
    }
    return;
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <>
      <h1>이재민 상세정보</h1>
      <table className="victim-table">
        <tr>
          <td className="victim-table-detail">이름</td>
          <td>{victim.name}</td>
        </tr>
        <tr>
          <td className="victim-table-detail">성별</td>
          <td>{victim.gender}</td>
        </tr>
        <tr>
          <td className="victim-table-detail">나이</td>
          <td>{victim.age}</td>
        </tr>
      </table>
      <button
        className="victim-btn"
        onClick={() => navigate(`/victim/update/${victim.victim_id}`)}
      >
        수정하기
      </button>
      <button
        className="victim-btn"
        onClick={() => {
          DeleteData();
        }}
      >
        삭제하기
      </button>
    </>
  );
};

export default View;
