import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./victim.css";
import { useNavigate } from "react-router-dom";

const View = (props) => {
  let [alert2, setAlert2] = useState(true);
  const [victim, setVictim] = useState([]);
  let { id } = useParams();

  const navigate = useNavigate();

  const fetchData = async () => {
    console.log("fetchData 실행!!!");
    const response = await axios.get(
      `http://localhost:4000/victim/detail/${id}`
    );
    console.log(response);
    if (victim.delete_yn === "Y") {
      alert("해당 데이터에 접근할 수 없습니다.");
      navigate("/victim");
    } else {
      setVictim(response.data[0]);
    }
  };

  const DeleteData = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const response = await axios.post(
        `http://localhost:4000/victim/delete/${id}`
      );
      if (response.status === 200) {
        alert("삭제되었습니다.");
        navigate("/victim");
      }
    }
    return;
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
    let timer = setTimeout(() => {
      setAlert2(false);
    }, 100);
    fetchData();
  }, [alert2]);

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
          <td>{checkGender(victim.gender)}</td>
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
